import React from 'react';
import {Ellipse as KonvaEllipse} from 'react-konva';
import {EllipseShape} from "@/types";

const Ellipse: React.FC<{ shape: EllipseShape }> = ({shape}) => {
    return (
        <KonvaEllipse
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
        />);
};

export default Ellipse;