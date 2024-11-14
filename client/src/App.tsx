import {Layer, Stage} from "react-konva";
import {clsx} from "clsx";
import Menu from "@/components/Menu";
import Shapes from "@/components/Shapes";
import {usePreventZoom, useScale, useWhiteboard} from '@/hooks';
import {ToolType} from "@/types";
import './App.css'

function App() {
    usePreventZoom();

    const {stageScale, stagePos, ...draggingProps} = useScale();

    const {stageRef, tool, isMouseDown, onMouseDown, onMouseMove, onMouseUp,} = useWhiteboard();

    return (
        <>
            <div className="grid-background">
                <Menu/>
                <Stage
                    ref={stageRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    {...draggingProps}
                    {...stagePos}
                    scale={{x: stageScale, y: stageScale}}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    draggable={tool === ToolType.GRAB}
                    className={clsx({
                        'cursor-grab': tool === ToolType.GRAB && !isMouseDown,
                        'cursor-grabbing': tool === ToolType.GRAB && isMouseDown,
                    })}
                >
                    <Layer>
                        <Shapes/>
                    </Layer>
                </Stage>
            </div>
        </>
    )
}

export default App;
