import React, {useRef} from "react";
import {Arrow as KonvaArrow} from 'react-konva';
import {ArrowShape} from "@/types";
import Konva from "konva";
import {useWhiteboard} from "@/hooks";


const Arrow: React.FC<{ shape: ArrowShape }> = ({shape}) => {
    const shapeRef = useRef<Konva.Arrow>(null);
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
        }) : prevShape))
    };

    return (
        <KonvaArrow
            ref={shapeRef}
            id={shape.id}
            key={shape.id}
            points={shape.points}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
            rotation={shape.rotation}
            onTransform={onChange}
            onDragMove={onChange}
            draggable={selectedIds.includes(shape.id)}
        />
    )
};

export default Arrow;