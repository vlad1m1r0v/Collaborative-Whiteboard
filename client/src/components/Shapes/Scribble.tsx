import React, {useRef} from "react";
import {Line as KonvaLine} from 'react-konva';
import {ScribbleShape} from "@/types";
import Konva from "konva";
import {useWhiteboard} from "@/hooks";

const Scribble: React.FC<{ shape: ScribbleShape }> = ({shape}) => {
    const shapeRef = useRef<Konva.Line>(null);
    const {selectedIds, setShapes} = useWhiteboard();

    const onChange = () => {
        const node = shapeRef.current!;

        const prevPoints = node.points();

        const newPoints: number[] = [];

        for (let i = 0; i < prevPoints.length / 2; i++) {
            const point = node.getAbsoluteTransform().point({
                x: prevPoints[i * 2],
                y: prevPoints[i * 2 + 1],
            });

            newPoints.push(point.x, point.y);
        }

        setShapes((prevShapes) => prevShapes.map((prevShape) => prevShape.id === shape.id ? ({
            ...prevShape,
            points: newPoints,
        }) : prevShape));
    };

    return (
        <KonvaLine
            ref={shapeRef}
            id={shape.id}
            key={shape.id}
            points={shape.points}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            rotation={shape.rotation}
            onTransform={onChange}
            onDragMove={onChange}
            draggable={selectedIds.includes(shape.id)}
        />
    )
};

export default Scribble;