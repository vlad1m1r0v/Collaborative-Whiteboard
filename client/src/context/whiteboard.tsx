import React, {createContext, useRef, useState} from 'react';
import Konva from 'konva';
import {type Shape, ToolType} from "@/types";

interface Props {
    stageRef: React.RefObject<Konva.Stage>;
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
}

const initialContext: Props = {
    stageRef: React.createRef<Konva.Stage>(),
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

    const value = {
        stageRef,
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