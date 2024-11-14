import React from 'react';
import {RegularPolygon} from "react-konva";
import {TriangleShape} from "@/types";

const Triangle: React.FC<{ shape: TriangleShape }> = ({shape}) => {
    return (
        <RegularPolygon
            key={shape.id}
            x={shape.x}
            y={shape.y}
            radius={shape.radius}
            sides={3}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
            rotation={shape.rotation}
        />
    );
};

export default Triangle;