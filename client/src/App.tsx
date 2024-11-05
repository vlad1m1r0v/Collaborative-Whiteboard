import './App.css'
import {Stage, Layer} from "react-konva";
import {usePreventZoom, useScale} from '@/hooks';


function App() {
    usePreventZoom();

    const { stageScale, stagePos, ...draggingProps } = useScale();

    return (
        <>
            <div className="grid-background">
                <Stage draggable
                       width={window.innerWidth}
                       height={window.innerHeight}
                       {...draggingProps}
                       {...stagePos}
                       scale={{ x: stageScale, y: stageScale }}
                >
                    <Layer>
                    </Layer>
                </Stage>
            </div>
        </>
    )
}

export default App
