import React, {createContext, useRef, useState} from 'react';
import Konva from 'konva';
import {type Shape, ShapeType, ToolType} from "@/types";
import {getRelativePointerPosition} from "@/helpers/konva.ts";
import {nanoid} from "nanoid";
import {KonvaEventObject} from "konva/lib/Node";

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
    stageRef: React.RefObject<Konva.Stage>;
    isMouseDown: boolean;
    onMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
    onMouseMove: (e: KonvaEventObject<MouseEvent>) => void;
    onMouseUp: (e: KonvaEventObject<MouseEvent>) => void;

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
    history: {prev: [], next: []},
    setHistory: () => {
    },
    stageRef: React.createRef<Konva.Stage>(),
    isMouseDown: false,
    onMouseDown: () => {
    },
    onMouseMove: () => {
    },
    onMouseUp: () => {
    },
};

const WhiteboardContext = createContext<Props>(initialContext);

const WhiteboardProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
        // Tool menu state: stroke width, font size, fill color, stroke color and current tool
        const [strokeColor, setStrokeColor] = useState<string>(initialContext.strokeColor);
        const [fontSize, setFontSize] = useState<number>(initialContext.fontSize);
        const [fillColor, setFillColor] = useState<string>(initialContext.fillColor);
        const [strokeWidth, setStrokeWidth] = useState<number>(initialContext.strokeWidth);
        const [tool, setTool] = useState<ToolType>(initialContext.tool);

        // Current shape state and history
        const [shapes, setShapes] = useState<Shape[]>(initialContext.shapes);
        const [history, setHistory] = useState<ShapeHistory>({prev: [], next: []});


        const stageRef = useRef<Konva.Stage>(null);


        const currentShapeRef = useRef<string>();
        const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

        const onMouseDown = (e: KonvaEventObject<MouseEvent>) => {
            setIsMouseDown(true);

            const stage = e.target.getStage();
            if (stage !== e.target) return;

            const pos = getRelativePointerPosition(stage);
            if (!pos) return;

            const id = nanoid();
            currentShapeRef.current = id;

            if (tool === ToolType.PEN) {
                setHistory((prevHistory) => (
                        {
                            prev: [...prevHistory.prev, shapes],
                            next: []
                        }
                    )
                );

                setShapes((prevShapes) => [...prevShapes,
                    {
                        id,
                        shapeType: ShapeType.SCRIBBLE,
                        stroke: strokeColor,
                        strokeWidth: strokeWidth,
                        rotation: 0,
                        points: [pos.x, pos.y]
                    }])
            }

            if (tool === ToolType.LINE) {
                setHistory((prevHistory) => (
                        {
                            prev: [...prevHistory.prev, shapes],
                            next: []
                        }
                    )
                );

                setShapes((prevShapes) => [...prevShapes,
                    {
                        id,
                        shapeType: ShapeType.LINE,
                        stroke: strokeColor,
                        strokeWidth: strokeWidth,
                        rotation: 0,
                        points: [pos.x, pos.y]
                    }
                ])
            }

            if (tool === ToolType.ARROW) {
                setHistory((prevHistory) => (
                        {
                            prev: [...prevHistory.prev, shapes],
                            next: []
                        }
                    )
                );

                setShapes((prevShapes) => [...prevShapes,
                    {
                        id,
                        shapeType: ShapeType.ARROW,
                        stroke: strokeColor,
                        strokeWidth: strokeWidth,
                        fill: fillColor,
                        rotation: 0,
                        points: [pos.x, pos.y]
                    }
                ])
            }

            if (tool === ToolType.ELLIPSE) {
                setHistory((prevHistory) => (
                        {
                            prev: [...prevHistory.prev, shapes],
                            next: []
                        }
                    )
                );

                setShapes((prevShapes) => [...prevShapes,
                    {
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
                    }])
            }

            if (tool === ToolType.TRIANGLE) {
                setHistory((prevHistory) => (
                        {
                            prev: [...prevHistory.prev, shapes],
                            next: []
                        }
                    )
                );

                setShapes((prevShapes) => [...prevShapes,
                    {
                        id,
                        shapeType: ShapeType.TRIANGLE,
                        stroke: strokeColor,
                        strokeWidth: strokeWidth,
                        fill: fillColor,
                        rotation: 0,
                        x: pos.x,
                        y: pos.y,
                        radius: 0,
                    }])
            }

            if (tool === ToolType.RECTANGLE) {
                setHistory((prevHistory) => (
                        {
                            prev: [...prevHistory.prev, shapes],
                            next: []
                        }
                    )
                );

                setShapes((prevShapes) => [...prevShapes,
                    {
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
                    }])
            }

            if (tool === ToolType.TEXT) {
                setHistory((prevHistory) => (
                        {
                            prev: [...prevHistory.prev, shapes],
                            next: []
                        }
                    )
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
                    }
                ]);
            }
        }

        const onMouseMove = (e: KonvaEventObject<MouseEvent>) => {
            if (!isMouseDown || !currentShapeRef.current) return;

            const stage = e.target.getStage();

            const pos = getRelativePointerPosition(stage);
            if (!pos) return;

            const id = currentShapeRef.current;

            if (tool === ToolType.PEN) {
                setShapes((prevShapes) => prevShapes.map((shape) =>
                    shape.shapeType === ShapeType.SCRIBBLE && shape.id === id ? {
                        ...shape,
                        points: [...shape.points, pos.x, pos.y]
                    } : shape
                ))
            }

            if (tool === ToolType.LINE || tool === ToolType.ARROW) {
                setShapes((prevShapes) => prevShapes.map((shape) =>
                    (shape.shapeType === ShapeType.LINE || shape.shapeType === ShapeType.ARROW) && shape.id === id ? {
                        ...shape,
                        points: [shape.points[0], shape.points[1], pos.x, pos.y]
                    } : shape
                ))
            }

            if (tool === ToolType.ELLIPSE) {
                setShapes((prevShapes) => prevShapes.map((shape) =>
                    (shape.shapeType === ShapeType.ELLIPSE && shape.id === id) ? {
                        ...shape,
                        radiusX: Math.abs(pos.x - shape.x) * (2 ** 0.5),
                        radiusY: Math.abs(pos.y - shape.y) * (2 ** 0.5),
                    } : shape))
            }

            if (tool === ToolType.TRIANGLE) {
                setShapes((prevShapes) => prevShapes.map((shape) =>
                    (shape.shapeType === ShapeType.TRIANGLE && shape.id === id) ? {
                        ...shape,
                        radius: ((pos.x - shape.x) ** 2 + (pos.y - shape.y) ** 2) ** 0.5,
                    } : shape))
            }

            if (tool === ToolType.RECTANGLE) {
                setShapes((prevShapes) => prevShapes.map((shape) =>
                    (shape.shapeType === ShapeType.RECTANGLE && shape.id === id) ? {
                        ...shape,
                        width: pos.x - shape.x,
                        height: pos.y - shape.y,
                    } : shape))
            }
        }

        const onMouseUp = () => {
            setIsMouseDown(false);
            currentShapeRef.current = undefined;
        }

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
            stageRef,
            isMouseDown,
            onMouseDown,
            onMouseMove,
            onMouseUp
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
}