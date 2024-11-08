import React, {createContext, useRef, useState} from 'react';
import Konva from 'konva';
import {type Shape, ShapeType, ToolType} from "@/types";
import {getRelativePointerPosition} from "@/helpers/konva.ts";
import {nanoid} from "nanoid";
import {KonvaEventObject} from "konva/lib/Node";

interface Props {
    stageRef: React.RefObject<Konva.Stage>;
    isMouseDown: boolean;
    fontSize: number;
    setFontSize: React.Dispatch<React.SetStateAction<number>>;
    fillColor: string;
    setFillColor: React.Dispatch<React.SetStateAction<string>>;
    strokeColor: string;
    setStrokeColor: React.Dispatch<React.SetStateAction<string>>;
    strokeWidth: number;
    setStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
    tool: ToolType;
    setTool: React.Dispatch<React.SetStateAction<ToolType>>;
    shapes: Shape[];
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
    onMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
    onMouseMove: (e: KonvaEventObject<MouseEvent>) => void;
    onMouseUp: (e: KonvaEventObject<MouseEvent>) => void;

}

const initialContext: Props = {
    stageRef: React.createRef<Konva.Stage>(),
    isMouseDown: false,
    fontSize: 12,
    setFontSize: () => {
    },
    fillColor: '#FFFFFF',
    setFillColor: () => {
    },
    strokeColor: '#000000',
    setStrokeColor: () => {
    },
    strokeWidth: 1,
    setStrokeWidth: () => {
    },
    tool: ToolType.SELECT,
    setTool: () => {
    },
    shapes: [],
    setShapes: () => {
    },
    onMouseDown: () => {
    },
    onMouseMove: () => {
    },
    onMouseUp: () => {
    },
};

const WhiteboardContext = createContext<Props>(initialContext);

const WhiteboardProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
        const stageRef = useRef<Konva.Stage>(null);
        const [fontSize, setFontSize] = useState<number>(12);
        const [fillColor, setFillColor] = useState<string>('#FFFFFF');
        const [strokeColor, setStrokeColor] = useState<string>('#000000');
        const [strokeWidth, setStrokeWidth] = useState<number>(1);
        const [tool, setTool] = useState<ToolType>(ToolType.SELECT);
        const [shapes, setShapes] = useState<Shape[]>([]);

        const currentShapeRef = useRef<string>();
        const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

        const onMouseDown = (e: KonvaEventObject<MouseEvent>) => {
            setIsMouseDown(true);

            const stage = e.target.getStage();
            const pos = getRelativePointerPosition(stage);
            if (!pos) return;

            const id = nanoid();
            currentShapeRef.current = id;

            if (tool === ToolType.PEN) {
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
        }

        const onMouseMove = (e: KonvaEventObject<MouseEvent>) => {
            if (!isMouseDown) return;

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
        }

        const value = {
            stageRef,
            isMouseDown,
            fontSize,
            setFontSize,
            fillColor,
            setFillColor,
            strokeColor,
            setStrokeColor,
            strokeWidth,
            setStrokeWidth,
            tool,
            setTool,
            shapes,
            setShapes,
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