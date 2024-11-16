import React, {useRef} from 'react';
import {RegularPolygon} from "react-konva";
import {TriangleShape} from "@/types";
import Konva from "konva";
import {useWhiteboard} from "@/hooks";

const Triangle: React.FC<{ shape: TriangleShape }> = ({shape}) => {
    const shapeRef = useRef<Konva.RegularPolygon>(null);
    const {selectedIds, setShapes} = useWhiteboard();

    const onChange = () => {
        const node = shapeRef.current!;

        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const avgScale = Math.sqrt(scaleX * scaleY);

        node.scaleX(1.0);
        node.scaleY(1.0);

        setShapes((prevShapes) => prevShapes.map((prevShape) => prevShape.id === shape.id ? ({
            ...prevShape,
            x: node.x(),
            y: node.y(),
            radius: node.radius() * avgScale,
            rotation: node.rotation(),
        }) : prevShape))
    };


    return (
        <RegularPolygon
            ref={shapeRef}
            id={shape.id}
            key={shape.id}
            x={shape.x}
            y={shape.y}
            radius={shape.radius}
            sides={3}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
            rotation={shape.rotation}
            onTransform={onChange}
            onDragMove={onChange}
            draggable={selectedIds.includes(shape.id)}
        />
    );
};

export default Triangle;