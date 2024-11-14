import React from "react";
import {Line as KonvaLine} from 'react-konva';
import {LineShape} from "@/types";

const Line: React.FC<{ shape: LineShape }> = ({shape}) => {
    return (
        <KonvaLine
            key={shape.id}
            points={shape.points}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            rotation={shape.rotation}
        />
    )
};

export default Line;