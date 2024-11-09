import React, {useState} from 'react';
import {Group, Text} from 'react-konva';
import {TextEditor} from './TextEditor';
import Konva from 'konva';
import {TextConfig} from 'konva/lib/shapes/Text';
import {useWhiteboard} from "@/hooks";
import {ToolType} from "@/types";

interface EditorStProps extends TextConfig {
    text: string;
    id: string;
}

export const EditableText = React.forwardRef<Konva.Text, EditorStProps>((props, ref) => {
    const {text, id, ...rest} = props;

    const [editorEnabled, setEditorEnabled] = React.useState(true);

    const [currentText, setCurrentText] = useState(text);

    const {setShapes, tool} = useWhiteboard();

    const textRef = React.useRef<Konva.Text>(null);

    React.useImperativeHandle(ref, () => textRef.current!);

    return (
        <Group draggable={tool === ToolType.GRAB}>
            <Text
                text={currentText}
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
                        value={currentText}
                        textNodeRef={textRef}
                        onChange={(newText) => {
                            setCurrentText(newText);

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