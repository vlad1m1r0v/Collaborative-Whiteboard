import React, { createContext, createRef, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { nanoid } from 'nanoid';
import { io, Socket } from 'socket.io-client';
import {
  ArrowShape,
  EllipseShape,
  LineShape,
  RectangleShape,
  ScribbleShape,
  type Shape,
  ShapeType,
  ToolType,
  TriangleShape,
} from '@/types';
import { getRelativePointerPosition } from '@/helpers/konva';


interface ShapeHistory {
  prev: Shape[][],
  next: Shape[][]
}

interface Props {
  strokeWidth: number;
  setStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  fillColor: string;
  setFillColor: React.Dispatch<React.SetStateAction<string>>;
  strokeColor: string;
  setStrokeColor: React.Dispatch<React.SetStateAction<string>>;
  shapes: Shape[];
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
  history: ShapeHistory,
  setHistory: React.Dispatch<React.SetStateAction<ShapeHistory>>;
  tool: ToolType;
  setTool: React.Dispatch<React.SetStateAction<ToolType>>;
  isMouseDown: boolean;
  selectedIds: string[];
  selectionRectRef: React.RefObject<Konva.Rect>,
  trRef: React.RefObject<Konva.Transformer>,
  layerRef: React.RefObject<Konva.Layer>,
  onMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
  onMouseMove: (e: KonvaEventObject<MouseEvent>) => void;
  onMouseUp: (e: KonvaEventObject<MouseEvent>) => void;
  onTouchStart: (e: KonvaEventObject<TouchEvent>) => void;
  onClickTap: (e: KonvaEventObject<MouseEvent>) => void;
  onChangeStart: (e: KonvaEventObject<Event>) => void;
  socket: Socket | undefined;
  uuid: string | undefined;
}

const initialContext: Props = {
  strokeWidth: 1,
  setStrokeWidth: () => {
  },
  fontSize: 12,
  setFontSize: () => {
  },
  fillColor: '#FFFFFF',
  setFillColor: () => {
  },
  strokeColor: '#000000',
  setStrokeColor: () => {
  },
  tool: ToolType.SELECT,
  setTool: () => {
  },
  shapes: [],
  setShapes: () => {
  },
  history: { prev: [], next: [] },
  setHistory: () => {
  },
  isMouseDown: false,
  selectedIds: [],
  selectionRectRef: createRef(),
  trRef: createRef(),
  layerRef: createRef(),
  onMouseDown: () => {
  },
  onMouseMove: () => {
  },
  onMouseUp: () => {
  },
  onTouchStart: () => {
  },
  onClickTap: () => {
  },
  onChangeStart: () => {
  },
  socket: undefined,
  uuid: undefined,
};

const WhiteboardContext = createContext<Props>(initialContext);

interface SelectionRectProps {
  isVisible: boolean;
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

const WhiteboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Tool menu state: stroke width, font size, fill color, stroke color and current tool
    const [strokeColor, setStrokeColor] = useState<string>(initialContext.strokeColor);
    const [fontSize, setFontSize] = useState<number>(initialContext.fontSize);
    const [fillColor, setFillColor] = useState<string>(initialContext.fillColor);
    const [strokeWidth, setStrokeWidth] = useState<number>(initialContext.strokeWidth);
    const [tool, setTool] = useState<ToolType>(initialContext.tool);

    // Current shape state and history of shape states
    const [shapes, setShapes] = useState<Shape[]>(initialContext.shapes);
    const [history, setHistory] = useState<ShapeHistory>(initialContext.history);

    // There is no better way to omit stale closure in state hooks
    const shapesRef = useRef<Shape[]>(shapes);
    const historyRef = useRef<ShapeHistory>(history);

    useEffect(() => {
      shapesRef.current = shapes;
    }, [shapes]);

    useEffect(() => {
      historyRef.current = history;
    }, [history]);


    // In current shape we store newly created shape ID
    const [currentShape, setCurrentShape] = useState<string>();

    // Store left mouse button state to detect do we draw / select / drag / transform or just move mouse
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    // Store reference to selection rectangle, transformer and layer
    const selectionRectRef = useRef<Konva.Rect>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const layerRef = useRef<Konva.Layer>(null);

    // Store coordinates of selection rectangle as reference
    const selectionRef = useRef<SelectionRectProps>({ isVisible: false, x1: 0, y1: 0, x2: 0, y2: 0 });

    // Store IDs of selected shapes so we know which shapes we should insert into transformer
    const [selectedIds, selectIds] = useState<string[]>([]);

    // Websocket
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
      const connection = io('http://localhost:8001');
      setSocket(connection);

      return () => {
        connection.disconnect();
      };
    }, [setSocket]);

    const { uuid } = useParams();

    // Join user to room and listen to events from other users of the same room
    useEffect(() => {
      if (uuid && socket) {
        socket?.emit('joinRoom', uuid);

        const createShape = (shape: Shape) => {
          setHistory((prevHistory) => ({
            prev: [...prevHistory.prev, shapesRef.current],
            next: [],
          }));
          setShapes((prevShapes) => [...prevShapes, shape]);
        };

        const updateShape = (shape: Shape) => {
          setShapes((prevShapes) => prevShapes.map((prevShape) =>
            prevShape.id === shape.id ?
              shape : prevShape,
          ));
        };

        const undo = () => {
          const { prev, next } = historyRef.current;
          if (!prev.length) return;

          const prevShapeState = prev[prev.length - 1];
          const rest = prev.slice(0, -1);

          setHistory({
            prev: rest,
            next: [shapesRef.current, ...next],
          });

          setShapes(prevShapeState);
        };

        const redo = () => {
          const { prev, next } = historyRef.current;
          if (!next.length) return;

          const [nextShapeState, ...rest] = next;

          setHistory({
            prev: [...prev, shapesRef.current],
            next: rest,
          });

          setShapes(nextShapeState);
        };

        socket?.on('createShape', createShape);
        socket?.on('updateShape', updateShape);
        socket?.on('undo', undo);
        socket?.on('redo', redo);

        return () => {
          socket.off('createShape', createShape);
          socket.off('updateShape', updateShape);
          socket.off('undo', undo);
          socket.off('redo', redo);
        };
      }
    }, [socket, uuid]);

    // Update shapes inside transformer each time we select new shapes
    useEffect(() => {
      const nodes = selectedIds.map((id) => layerRef.current!.findOne('#' + id));

      trRef.current!.nodes(nodes.filter(node => !!node));
    }, [selectedIds]);

    useEffect(() => {
      const onDeleteButtonPress = (event: KeyboardEvent) => {
        if (event.key === 'Delete' && selectedIds.length > 0) {
          setHistory((prevHistory) => ({
            prev: [...prevHistory.prev, shapes],
            next: [],
          }));

          setShapes((prevShapes) =>
            prevShapes.filter((shape) => !selectedIds.includes(shape.id)),
          );
          selectIds([]);
        }
      };

      window.addEventListener('keydown', onDeleteButtonPress);

      return () => {
        window.removeEventListener('keydown', onDeleteButtonPress);
      };
    }, [selectedIds]);


    // Update properties of selection rectangle
    const updateSelectionRect = () => {
      const node = selectionRectRef.current!;
      const selection = selectionRef.current;

      node.setAttrs({
        visible: selection.isVisible,
        x: Math.min(selection.x1, selection.x2),
        y: Math.min(selection.y1, selection.y2),
        width: Math.abs(selection.x1 - selection.x2),
        height: Math.abs(selection.y1 - selection.y2),
        fill: 'rgba(0, 161, 255, 0.3)',
      });
      node.getLayer()!.batchDraw();
    };

    const onMouseDown = (e: KonvaEventObject<MouseEvent>) => {
      setIsMouseDown(true);

      // If we didn't click on shape or transformer
      const stage = e.target.getStage();
      if (stage !== e.target) return;

      const pos = getRelativePointerPosition(stage);
      if (!pos) return;

      if (tool === ToolType.SELECT) {
        selectionRef.current = { isVisible: true, x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y };
        updateSelectionRect();
      }

      const id = nanoid();
      setCurrentShape(id);

      if (tool === ToolType.PEN) {
        setHistory((prevHistory) => (
            {
              prev: [...prevHistory.prev, shapes],
              next: [],
            }
          ),
        );

        const shape: ScribbleShape = {
          id,
          shapeType: ShapeType.SCRIBBLE,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          rotation: 0,
          points: [pos.x, pos.y],
        };

        setShapes((prevShapes) => [...prevShapes, shape]);

        socket?.emit('createShape', { room: uuid, shape });
      }

      if (tool === ToolType.LINE) {
        setHistory((prevHistory) => (
            {
              prev: [...prevHistory.prev, shapes],
              next: [],
            }
          ),
        );

        const shape: LineShape = {
          id,
          shapeType: ShapeType.LINE,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          rotation: 0,
          points: [pos.x, pos.y],
        };

        setShapes((prevShapes) => [...prevShapes, shape]);

        socket?.emit('createShape', { room: uuid, shape });
      }

      if (tool === ToolType.ARROW) {
        setHistory((prevHistory) => (
            {
              prev: [...prevHistory.prev, shapes],
              next: [],
            }
          ),
        );

        const shape: ArrowShape = {
          id,
          shapeType: ShapeType.ARROW,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          fill: fillColor,
          rotation: 0,
          points: [pos.x, pos.y],
        };

        setShapes((prevShapes) => [...prevShapes, shape]);

        socket?.emit('createShape', { room: uuid, shape });
      }

      if (tool === ToolType.ELLIPSE) {
        setHistory((prevHistory) => (
            {
              prev: [...prevHistory.prev, shapes],
              next: [],
            }
          ),
        );

        const shape: EllipseShape = {
          id,
          shapeType: ShapeType.ELLIPSE,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          fill: fillColor,
          rotation: 0,
          x: pos.x,
          y: pos.y,
          radiusX: 0,
          radiusY: 0,
        };

        setShapes((prevShapes) => [...prevShapes, shape]);

        socket?.emit('createShape', { room: uuid, shape });
      }

      if (tool === ToolType.TRIANGLE) {
        setHistory((prevHistory) => (
            {
              prev: [...prevHistory.prev, shapes],
              next: [],
            }
          ),
        );

        const shape: TriangleShape = {
          id,
          shapeType: ShapeType.TRIANGLE,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          fill: fillColor,
          rotation: 0,
          x: pos.x,
          y: pos.y,
          radius: 0,
        };

        setShapes((prevShapes) => [...prevShapes, shape]);

        socket?.emit('createShape', { room: uuid, shape });
      }

      if (tool === ToolType.RECTANGLE) {
        setHistory((prevHistory) => (
            {
              prev: [...prevHistory.prev, shapes],
              next: [],
            }
          ),
        );

        const shape: RectangleShape = {
          id,
          shapeType: ShapeType.RECTANGLE,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          fill: fillColor,
          rotation: 0,
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
        };

        setShapes((prevShapes) => [...prevShapes, shape]);

        socket?.emit('createShape', { room: uuid, shape });
      }

      if (tool === ToolType.TEXT) {
        setHistory((prevHistory) => (
            {
              prev: [...prevHistory.prev, shapes],
              next: [],
            }
          ),
        );

        setShapes((prevShapes) => [
          ...prevShapes,
          {
            id,
            shapeType: ShapeType.TEXT,
            x: pos.x,
            y: pos.y,
            text: '',
            width: 200,
            fontSize,
            fill: fillColor,
            rotation: 0,
          },
        ]);
      }
    };

    const onMouseMove = (e: KonvaEventObject<MouseEvent>) => {
      if (!isMouseDown || !currentShape) return;

      const stage = e.target.getStage();

      // Check if we didn't click outside canvas
      const pos = getRelativePointerPosition(stage);
      if (!pos) return;

      if (tool === ToolType.SELECT) {
        const selection = selectionRef.current;

        if (!selection.isVisible) return;

        selection.x2 = pos.x;
        selection.y2 = pos.y;

        updateSelectionRect();
      }

      const id = currentShape;

      if (tool === ToolType.PEN) {
        const shape = shapes.find((shape) => shape.id === id) as ScribbleShape;

        shape.points = [...shape.points, pos.x, pos.y];

        setShapes((prevShapes) => prevShapes.map((prevShape) =>
          prevShape.shapeType === ShapeType.SCRIBBLE && prevShape.id === id ? shape : prevShape));

        socket?.emit('updateShape', { room: uuid, shape });
      }

      if (tool === ToolType.LINE) {
        const shape = shapes.find((shape) => shape.id === id) as LineShape;

        shape.points = [shape.points[0], shape.points[1], pos.x, pos.y];

        setShapes((prevShapes) => prevShapes.map((prevShape) =>
          prevShape.shapeType === ShapeType.SCRIBBLE && prevShape.id === id ? shape : prevShape));

        socket?.emit('updateShape', { room: uuid, shape });
      }

      if (tool === ToolType.ARROW) {
        const shape = shapes.find((shape) => shape.id === id) as ArrowShape;

        shape.points = [shape.points[0], shape.points[1], pos.x, pos.y];

        setShapes((prevShapes) => prevShapes.map((prevShape) =>
          prevShape.shapeType === ShapeType.ARROW && prevShape.id === id ? shape : prevShape));

        socket?.emit('updateShape', { room: uuid, shape });
      }

      if (tool === ToolType.ELLIPSE) {
        const shape = shapes.find((shape) => shape.id === id) as EllipseShape;

        shape.radiusX = Math.abs(pos.x - shape.x) * (2 ** 0.5);
        shape.radiusY = Math.abs(pos.y - shape.y) * (2 ** 0.5);

        setShapes((prevShapes) => prevShapes.map((prevShape) =>
          (prevShape.shapeType === ShapeType.ELLIPSE && prevShape.id === id) ? shape : prevShape));

        socket?.emit('updateShape', { room: uuid, shape });
      }

      if (tool === ToolType.TRIANGLE) {
        const shape = shapes.find((shape) => shape.id === id) as TriangleShape;

        shape.radius = ((pos.x - shape.x) ** 2 + (pos.y - shape.y) ** 2) ** 0.5;

        setShapes((prevShapes) => prevShapes.map((prevShape) =>
          (prevShape.shapeType === ShapeType.TRIANGLE && prevShape.id === id) ? shape : prevShape));

        socket?.emit('updateShape', { room: uuid, shape });
      }

      if (tool === ToolType.RECTANGLE) {
        const shape = shapes.find((shape) => shape.id === id) as RectangleShape;

        shape.width = pos.x - shape.x;
        shape.height = pos.y - shape.y;

        setShapes((prevShapes) => prevShapes.map((prevShape) =>
          (prevShape.shapeType === ShapeType.RECTANGLE && prevShape.id === id) ? shape : prevShape));

        socket?.emit('updateShape', { room: uuid, shape });
      }
    };

    const onMouseUp = () => {
      if (tool === ToolType.SELECT) {
        // If we just clicked - do nothing
        const { x1, x2, y1, y2 } = selectionRef.current;
        const isClicked = x1 == x2 && y1 == y2;

        if (isClicked) {
          return;
        }

        const selection = selectionRef.current;

        selection.isVisible = false;

        selection.x1 = 0;
        selection.y1 = 0;
        selection.x2 = 0;
        selection.y2 = 0;

        const selBox = selectionRectRef.current!.getClientRect();

        const elements: (Konva.Shape | Konva.Group)[] = [];

        layerRef.current!.children.forEach((child) => {
          // Only shapes are given ids excluding selection rectangle
          if (child.id().length > 0) {
            const elBox = child.getClientRect();

            if (Konva.Util.haveIntersection(selBox, elBox)) {
              elements.push(child);
            }
          }
        });

        selectIds(elements.map((el) => el.id()));

        updateSelectionRect();
      }

      setIsMouseDown(false);
      setCurrentShape(undefined);
    };

    // Deselect shapes which are inside transformer if we clicked on empty area
    const onTouchStart = (e: KonvaEventObject<TouchEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();

      if (clickedOnEmpty) {
        selectIds([]);
      }
    };

    const onClickTap = (e: KonvaEventObject<MouseEvent>) => {
      // If we select with selection rectangle - do nothing
      const { x1, x2, y1, y2 } = selectionRef.current;
      const isMoved = x1 !== x2 || y1 !== y2;

      if (isMoved) {
        return;
      }

      const stage = e.target.getStage()!;
      const layer = layerRef.current!;
      const tr = trRef.current!;

      // If we clicked on empty area - remove all selections
      if (e.target === stage) {
        selectIds([]);
        return;
      }

      // If target has no id then it's not shape
      if (e.target.id().length === 0) return;

      // Did we press shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;

      // Is shape inside transformer already?
      const isSelected = tr.nodes().indexOf(e.target) >= 0;

      // If no key pressed and the node is not selected - select just one
      if (!metaPressed && !isSelected) {
        selectIds([e.target.id()]);
        // if we pressed keys and node was selected - we need to remove it from selection
      } else if (metaPressed && isSelected) {
        selectIds((prevIds) => (prevIds.filter((shapeId) => shapeId !== e.target.id())));
        // Add node into selection
      } else if (metaPressed && !isSelected) {
        selectIds((prevIds) => ([...prevIds, e.target.id()]));
      }

      layer.draw();
    };

    const onChangeStart = () => {
      setHistory((prevHistory) => ({
        prev: [...prevHistory.prev, shapes],
        next: [],
      }));
    };

    const value = {
      strokeWidth,
      setStrokeWidth,
      fontSize,
      setFontSize,
      fillColor,
      setFillColor,
      strokeColor,
      setStrokeColor,
      tool,
      setTool,
      shapes,
      setShapes,
      history,
      setHistory,
      isMouseDown,
      selectedIds,
      selectionRectRef,
      trRef,
      layerRef,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onTouchStart,
      onClickTap,
      onChangeStart,
      socket,
      uuid,
    };

    return (
      <WhiteboardContext.Provider value={value}>
        {children}
      </WhiteboardContext.Provider>
    );
  }
;

export {
  WhiteboardContext,
  WhiteboardProvider,
};