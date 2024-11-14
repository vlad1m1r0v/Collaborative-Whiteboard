import React from "react";
import {Arrow as KonvaArrow} from 'react-konva';
import {ArrowShape} from "@/types";


const Arrow: React.FC<{ shape: ArrowShape }> = ({shape}) => {
    return (
        <KonvaArrow
            id={shape.id}
            key={shape.id}
            points={shape.points}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
            rotation={shape.rotation}
        />
    )
};

export default Arrow;