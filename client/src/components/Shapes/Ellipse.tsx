import React, {useRef} from 'react';
import {Ellipse as KonvaEllipse} from 'react-konva';
import Konva from "konva";
import {EllipseShape} from "@/types";
import {useWhiteboard} from "@/hooks";

const Ellipse: React.FC<{ shape: EllipseShape }> = ({shape}) => {
    const shapeRef = useRef<Konva.Ellipse>(null);
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
            radiusX: node.radiusX() * scaleX,
            radiusY: node.radiusY() * scaleY,
            rotation: node.rotation(),
        }) : prevShape))
    };

    return (
        <KonvaEllipse
            ref={shapeRef}
            id={shape.id}
            key={shape.id}
            x={shape.x}
            y={shape.y}
            radiusX={shape.radiusX}
            radiusY={shape.radiusY}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
            rotation={shape.rotation}
            onTransform={onChange}
            onDragMove={onChange}
            draggable={selectedIds.includes(shape.id)}
        />);
};

export default Ellipse;