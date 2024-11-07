import './App.css'
import {Stage, Layer, Circle} from "react-konva";
import {EditableText} from "@/components/shapes";
import {usePreventZoom, useScale} from '@/hooks';
import {Menu} from "@/components";


function App() {
    usePreventZoom();

    const {stageScale, stagePos, ...draggingProps} = useScale();

    return (
        <>
            <div className="grid-background">
                    <Menu/>
                    <Stage
                        draggable
                           width={window.innerWidth}
                           height={window.innerHeight}
                           {...draggingProps}
                           {...stagePos}
                           scale={{x: stageScale, y: stageScale}}
                    >
                        <Layer>
                            <EditableText rotation={30} x={200} y={200} fontSize={24} text={"Some text can be there"}
                                          draggable></EditableText>
                            <Circle x={300} y={400} radius={100} fill={"green"} stroke={"black"} strokeWidth={5}
                                    draggable></Circle>
                        </Layer>
                    </Stage>
            </div>
        </>
    )
}

export default App;
