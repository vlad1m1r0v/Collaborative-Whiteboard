import './App.css'
import {Stage, Layer, Ellipse, Arrow, RegularPolygon, Line, Rect} from "react-konva";
import {usePreventZoom, useScale} from '@/hooks';
import {Menu, EditableText} from "@/components";
import {WhiteboardProvider, WhiteboardContext} from "@/context";
import {useContext} from "react";


function App() {
    usePreventZoom();

    const {stageScale, stagePos, ...draggingProps} = useScale();

    const {stageRef} = useContext(WhiteboardContext);

    return (
        <>
            <div className="grid-background">
                <WhiteboardProvider>
                    <Menu/>
                    <Stage
                        ref={stageRef}
                        width={window.innerWidth}
                        height={window.innerHeight}
                        {...draggingProps}
                        {...stagePos}
                        scale={{x: stageScale, y: stageScale}}
                        draggable
                    >
                        <Layer>
                            <Line
                                points={[0, 212, 50, 152, 100, 212]}
                                stroke={"black"}
                                fill={"green"}
                                strokeWidth={5}
                                draggable>
                            </Line>
                            <Line
                                points={[150, 212, 250, 212]}
                                stroke={"black"}
                                fill={"green"}
                                strokeWidth={5}
                                draggable>
                            </Line>
                            <Arrow
                                points={[300, 212, 400, 212]}
                                stroke={"black"}
                                fill={"green"}
                                strokeWidth={5}
                                draggable>
                            </Arrow>
                            <Ellipse
                                x={500}
                                y={212}
                                radiusX={50}
                                radiusY={25}
                                fill={"green"}
                                stroke={"black"}
                                strokeWidth={5}
                                draggable>
                            </Ellipse>
                            <RegularPolygon
                                sides={3}
                                radius={50}
                                x={650}
                                y={217}
                                fill={"green"}
                                stroke={"black"}
                                strokeWidth={5}
                                draggable>
                            </RegularPolygon>
                            <Rect
                                x={750}
                                y={187}
                                width={100}
                                height={50}
                                fill={'green'}
                                stroke={"black"}
                                strokeWidth={5}
                                draggable>
                            </Rect>
                            <EditableText
                                x={900}
                                y={200}
                                fontSize={24}
                                fill={'red'}
                                text={"Text"}
                                draggable>
                            </EditableText>
                        </Layer>
                    </Stage>
                </WhiteboardProvider>
            </div>
        </>
    )
}

export default App;
