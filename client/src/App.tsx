import './App.css'
import {Arrow, Ellipse, Layer, Line, Stage, RegularPolygon, Rect} from "react-konva";
import {usePreventZoom, useScale, useWhiteboard} from '@/hooks';
import {EditableText, Menu} from "@/components";
import {ShapeType, ToolType} from "@/types";
import {clsx} from "clsx";


function App() {
    usePreventZoom();

    const {stageScale, stagePos, ...draggingProps} = useScale();

    const {stageRef, tool, shapes, onMouseDown, onMouseMove, onMouseUp, isMouseDown} = useWhiteboard();

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
                                if (shape.shapeType === ShapeType.SCRIBBLE || shape.shapeType === ShapeType.LINE) {
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

                                if (shape.shapeType === ShapeType.ARROW) {
                                    return (
                                        <Arrow
                                            points={shape.points}
                                            key={shape.id}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            fill={shape.fill}
                                            rotation={shape.rotation}
                                            draggable>
                                        </Arrow>
                                    )
                                }

                                if (shape.shapeType === ShapeType.ELLIPSE) {
                                    return (
                                        <Ellipse
                                            x={shape.x}
                                            y={shape.y}
                                            radiusX={shape.radiusX}
                                            radiusY={shape.radiusY}
                                            key={shape.id}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            fill={shape.fill}
                                            rotation={shape.rotation}>
                                        </Ellipse>
                                    )
                                }

                                if (shape.shapeType === ShapeType.TRIANGLE) {
                                    return (
                                        <RegularPolygon
                                            x={shape.x}
                                            y={shape.y}
                                            radius={shape.radius}
                                            sides={3}
                                            key={shape.id}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            fill={shape.fill}
                                            rotation={shape.rotation}
                                            draggable>
                                        </RegularPolygon>
                                    )
                                }

                                if (shape.shapeType === ShapeType.RECTANGLE) {
                                    return (
                                        <Rect
                                            x={shape.x}
                                            y={shape.y}
                                            width={shape.width}
                                            height={shape.height}
                                            key={shape.id}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            fill={shape.fill}
                                            rotation={shape.rotation}>
                                        </Rect>
                                    )
                                }

                                if (shape.shapeType === ShapeType.TEXT) {
                                    return (
                                        <EditableText
                                            key={shape.id}
                                            id={shape.id}
                                            x={shape.x}
                                            y={shape.y}
                                            text={shape.text}
                                            fontSize={shape.fontSize}
                                            fill={shape.fill}
                                            width={shape.width}
                                            rotation={shape.rotation}
                                        />
                                    );
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
