import {Html} from "react-konva-utils";
import React, {RefObject} from 'react';
import Konva from "konva";

interface Props {
    textNodeRef: RefObject<Konva.Text>;
    value: string;
    onBlur: () => void;
    onChange: (value: string) => void;
}

export const TextEditor = ({
                               textNodeRef,
                               value,
                               onBlur,
                               onChange,
                           }: Props) => {
    const [style, setStyle] = React.useState<React.CSSProperties>();

    React.useLayoutEffect(() => {
        const textNode = textNodeRef.current;

        const newStyle: React.CSSProperties = {
            width: `${textNode!.width() - textNode!.padding() * 2}px`,
            height: `${textNode!.height() - textNode!.padding() * 2 + 10}px`,
            fontSize: `${textNode!.fontSize()}px`,
            border: 'none',
            padding: '0px',
            overflow: 'hidden',
            background: 'none',
            outline: 'none',
            resize: 'none',
            lineHeight: textNode!.lineHeight() + 0.01,
            fontFamily: `"${textNode!.fontFamily()}"`,
            position: 'absolute',
            top: `${textNode!.getPosition()!.y}px`,
            left: `${textNode!.getPosition()!.x}px`,
            transform: `rotate(${textNode?.rotation()}deg)`,
            transformOrigin: 'left top',
            textAlign: textNode!.align() as React.CSSProperties['textAlign'],
            color: textNode!.fill() as React.CSSProperties['color'],
            overflowWrap: 'break-word',
            whiteSpace: 'normal',
            userSelect: 'text',
            wordBreak: 'normal',
        };

        setStyle(newStyle);
    }, [textNodeRef]);

    return (
        <Html>
            <textarea
                className="polotno-input"
                style={{
                    ...style,
                }}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                onBlur={onBlur}
            />
        </Html>
    );
};