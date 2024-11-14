import React from 'react';
import {Image as KonvaImage} from 'react-konva';
import {ImageShape} from "@/types";

const Image: React.FC<{ shape: ImageShape }> = ({shape}) => {
    return (
        <KonvaImage
            id={shape.id}
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            image={shape.image}
            rotation={shape.rotation}/>
    );
};

export default Image;