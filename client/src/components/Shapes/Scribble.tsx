import React from "react";
import {Line as KonvaLine} from 'react-konva';
import {ScribbleShape} from "@/types";

const Scribble: React.FC<{ shape: ScribbleShape }> = ({shape}) => {
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

export default Scribble;