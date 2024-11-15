import {Layer, Stage, Rect, Transformer} from "react-konva";
import {clsx} from "clsx";
import Menu from "@/components/Menu";
import Shapes from "@/components/Shapes";
import {usePreventZoom, useScale, useWhiteboard} from '@/hooks';
import {ToolType} from "@/types";
import './App.css'

function App() {
    usePreventZoom();

    const {stageScale, stagePos, ...draggingProps} = useScale();

    const {
        tool,
        isMouseDown,
        selectionRectRef,
        trRef,
        layerRef,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onTouchStart,
        onClickTap,
        onTransform
    } = useWhiteboard();

    return (
        <>
            <div className="grid-background">
                <Menu/>
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    {...draggingProps}
                    {...stagePos}
                    scale={{x: stageScale, y: stageScale}}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onTouchStart={onTouchStart}
                    onClick={onClickTap}
                    onTap={onClickTap}
                    draggable={tool === ToolType.GRAB}
                    className={clsx({
                        'cursor-grab': tool === ToolType.GRAB && !isMouseDown,
                        'cursor-grabbing': tool === ToolType.GRAB && isMouseDown,
                    })}
                >
                    <Layer ref={layerRef}>
                        {/*All shapes are rendered there*/}
                        <Shapes/>
                        {/*Transformer which allows us to rotate / resize shapes*/}
                        <Transformer
                            ref={trRef}
                            onTransform={onTransform}
                        />
                        {/*Selection rectangle*/}
                        <Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef}/>
                    </Layer>
                </Stage>
            </div>
        </>
    )
}

export default App;
