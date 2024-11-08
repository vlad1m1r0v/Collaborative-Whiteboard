import React from 'react';
import { Group, Text } from 'react-konva';
import { TextEditor } from './TextEditor';
import Konva from 'konva';
import { TextConfig } from 'konva/lib/shapes/Text';

interface EditorStProps extends TextConfig {
    text: string;
}

export const EditableText = React.forwardRef<Konva.Text, EditorStProps>((props, ref) => {
    const {text, ...rest } = props;
    const [editorEnabled, setEditorEnabled] = React.useState(false);
    const [currentText, setCurrentText] = React.useState(text);
    const textRef = React.useRef<Konva.Text>(null);

    React.useImperativeHandle(ref, () => textRef.current!);

    return (
        <Group draggable>
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