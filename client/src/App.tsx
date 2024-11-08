import './App.css'
import {Layer, Stage, Line} from "react-konva";
import {usePreventZoom, useScale} from '@/hooks';
import {Menu} from "@/components";
import {WhiteboardContext} from "@/context";
import {useContext} from "react";
import {ShapeType, ToolType} from "@/types";
import {clsx} from "clsx";


function App() {
    usePreventZoom();

    const {stageScale, stagePos, ...draggingProps} = useScale();

    const {stageRef, tool, shapes, onMouseDown, onMouseMove, onMouseUp, isMouseDown} = useContext(WhiteboardContext);

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
                        {
                            shapes.map((shape) => {
                                if (shape.shapeType === ShapeType.SCRIBBLE) {
                                    return (
                                        <Line
                                            points={shape.points}
                                            key={shape.id}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            rotation={shape.rotation}
                                            draggable>
                                        </Line>
                                    )
                                }
                            })
                        }
                    </Layer>
                </Stage>
            </div>
        </>
    )
}

export default App;
