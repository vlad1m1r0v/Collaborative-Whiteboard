import {Arrow, Ellipse, Image, Layer, Line, Rect, RegularPolygon, Stage} from "react-konva";
import {clsx} from "clsx";
import Menu from "@/components/Menu";
import {EditableText} from "@/components/shapes";
import {usePreventZoom, useScale, useWhiteboard} from '@/hooks';
import {ShapeType, ToolType} from "@/types";
import './App.css'

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
                                            key={shape.id}
                                            points={shape.points}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            rotation={shape.rotation}
                                            draggable={tool===ToolType.GRAB}>
                                        </Line>
                                    )
                                }

                                if (shape.shapeType === ShapeType.ARROW) {
                                    return (
                                        <Arrow
                                            key={shape.id}
                                            points={shape.points}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            fill={shape.fill}
                                            rotation={shape.rotation}
                                            draggable={tool===ToolType.GRAB}>
                                        </Arrow>
                                    )
                                }

                                if (shape.shapeType === ShapeType.ELLIPSE) {
                                    return (
                                        <Ellipse
                                            key={shape.id}
                                            x={shape.x}
                                            y={shape.y}
                                            radiusX={shape.radiusX}
                                            radiusY={shape.radiusY}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            fill={shape.fill}
                                            rotation={shape.rotation}
                                            draggable={tool===ToolType.GRAB}>
                                        </Ellipse>
                                    )
                                }

                                if (shape.shapeType === ShapeType.TRIANGLE) {
                                    return (
                                        <RegularPolygon
                                            key={shape.id}
                                            x={shape.x}
                                            y={shape.y}
                                            radius={shape.radius}
                                            sides={3}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            fill={shape.fill}
                                            rotation={shape.rotation}
                                            draggable={tool===ToolType.GRAB}>
                                        </RegularPolygon>
                                    )
                                }

                                if (shape.shapeType === ShapeType.RECTANGLE) {
                                    return (
                                        <Rect
                                            key={shape.id}
                                            x={shape.x}
                                            y={shape.y}
                                            width={shape.width}
                                            height={shape.height}
                                            stroke={shape.stroke}
                                            strokeWidth={shape.strokeWidth}
                                            fill={shape.fill}
                                            rotation={shape.rotation}
                                            draggable={tool===ToolType.GRAB}>
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

                                if (shape.shapeType === ShapeType.IMAGE) {
                                    return <Image
                                        key={shape.id}
                                        x={shape.x}
                                        y={shape.y}
                                        width={shape.width}
                                        height={shape.height}
                                        image={shape.image}
                                        rotation={shape.rotation}
                                        draggable={tool === ToolType.GRAB}>
                                    </Image>
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
