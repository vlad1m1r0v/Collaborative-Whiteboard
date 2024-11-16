import React, {useRef} from 'react';
import {Rect as KonvaRect} from 'react-konva';
import Konva from "konva";
import {RectangleShape} from "@/types";
import {useWhiteboard} from "@/hooks";

const Rectangle: React.FC<{ shape: RectangleShape }> = ({shape}) => {
    const shapeRef = useRef<Konva.Rect>(null);
    const {selectedIds, setShapes} = useWhiteboard();

    const onChange = () => {
        const node = shapeRef.current!;

        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1.0);
        node.scaleY(1.0);


        setShapes((prevShapes) => prevShapes.map((prevShape) => prevShape.id === shape.id ? ({
            ...prevShape,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
            rotation: node.rotation(),
        }) : prevShape))
    };

    return (
        <KonvaRect
            ref={shapeRef}
            id={shape.id}
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
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

export default Rectangle;