import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Konva from 'konva';
import {Group, Text as KonvaText} from 'react-konva';
import {useWhiteboard} from "@/hooks";
import {TextShape} from "@/types";
import {TextEditor} from './TextEditor';

export const Text = forwardRef<Konva.Text, { shape: TextShape }>(({shape}, ref) => {
    const [editorEnabled, setEditorEnabled] = useState(true);

    const {selectedIds, setHistory, shapes, setShapes} = useWhiteboard();

    const textRef = useRef<Konva.Text>(null);

    const onChange = () => {
        const node = textRef.current!;

        const scaleX = node.scaleX();

        node.scaleX(1.0);
        node.scaleY(1.0);

        setShapes((prevShapes) => prevShapes.map((prevShape) => prevShape.id === shape.id ? ({
            ...prevShape,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            rotation: node.rotation(),
        }) : prevShape));
    };

    useImperativeHandle(ref, () => textRef.current!);

    return (
        <>
            <KonvaText
                id={shape.id}
                key={shape.id}
                width={shape.width}
                x={shape.x}
                y={shape.y}
                fontSize={shape.fontSize}
                text={shape.text}
                fill={shape.fill}
                rotation={shape.rotation}
                ref={textRef}
                onDblClick={() => {
                    setEditorEnabled(true);
                }}
                onDragMove={onChange}
                onTransform={onChange}
                draggable={selectedIds.includes(shape.id)}
                visible={!editorEnabled}
            />
            {editorEnabled && (
                <Group>
                    <TextEditor
                        value={shape.text}
                        textNodeRef={textRef}
                        onChange={(newText) => {
                            setHistory((prevHistory) => (
                                {
                                    prev: [...prevHistory.prev, shapes],
                                    next: []
                                }
                            ));

                            setShapes((prevShapes) => prevShapes.map((prevShape) => prevShape.id === shape.id ? {
                                ...prevShape,
                                text: newText,
                            } : prevShape));
                        }}
                        onBlur={() => {
                            setEditorEnabled(false);
                        }}
                    />
                </Group>
            )}
        </>
    );
});