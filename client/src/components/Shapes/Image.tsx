import React, {useRef} from 'react';
import {Image as KonvaImage} from 'react-konva';
import {ImageShape} from "@/types";
import Konva from "konva";
import {useWhiteboard} from "@/hooks";

const Image: React.FC<{ shape: ImageShape }> = ({shape}) => {
    const shapeRef = useRef<Konva.Image>(null);
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
        <KonvaImage
            ref={shapeRef}
            id={shape.id}
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            image={shape.image}
            rotation={shape.rotation}
            onTransform={onChange}
            onDragMove={onChange}
            draggable={selectedIds.includes(shape.id)}/>
    );
};

export default Image;