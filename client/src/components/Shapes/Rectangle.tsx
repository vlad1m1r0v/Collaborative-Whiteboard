import React from 'react';
import { Rect as KonvaRect} from 'react-konva';
import {RectangleShape} from "@/types";

const Rectangle: React.FC<{ shape: RectangleShape }> = ({shape}) => {
    return (
        <KonvaRect
            id={shape.id}
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
            rotation={shape.rotation}/>
    );
};

export default Rectangle;