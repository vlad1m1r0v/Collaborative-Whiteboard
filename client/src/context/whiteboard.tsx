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
        const id = nanoid();

        setIsMouseDown(true);

        const stage = e.target.getStage();
        const pos = getRelativePointerPosition(stage);
        if (!pos) return;

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
};

export {
    WhiteboardContext,
    WhiteboardProvider,
}