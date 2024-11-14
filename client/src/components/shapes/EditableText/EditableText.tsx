import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Group, Text} from 'react-konva';
import Konva from 'konva';
import {TextConfig} from 'konva/lib/shapes/Text';
import {useWhiteboard} from "@/hooks";
import {ToolType} from "@/types";
import {TextEditor} from './TextEditor';

interface EditorStProps extends TextConfig {
    text: string;
    id: string;
}

export const EditableText = forwardRef<Konva.Text, EditorStProps>((props, ref) => {
    const {text, id, ...rest} = props;

    const [editorEnabled, setEditorEnabled] = useState(true);

    const {setHistory, shapes, setShapes, tool} = useWhiteboard();

    const textRef = useRef<Konva.Text>(null);

    useImperativeHandle(ref, () => textRef.current!);


    return (
        <Group>
            <Text
                draggable={tool === ToolType.GRAB}
                text={text}
                ref={textRef}
                onDblClick={() => {
                    setEditorEnabled(true);
                }}
                visible={!editorEnabled}
                {...rest}
            />
            {editorEnabled && (
                <Group>
                    <TextEditor
                        value={text}
                        textNodeRef={textRef}
                        onChange={(newText) => {
                            setHistory((prevHistory) => (
                                {
                                    prev: [...prevHistory.prev, shapes],
                                    next: []
                                }
                            ));

                            setShapes((prevShapes) => prevShapes.map((shape) => shape.id === id ? {
                                ...shape,
                                text: newText,
                            } : shape));
                        }}
                        onBlur={() => {
                            setEditorEnabled(false);
                        }}
                    />
                </Group>
            )}
        </Group>
    );
});