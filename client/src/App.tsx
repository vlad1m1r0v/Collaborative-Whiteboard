import './App.css'
import {Layer, Stage, Text, Rect} from "react-konva";

function App() {
    return (
        <>
            <div className="grid-background">
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        <Text x={20} y={20} text={"Example of text"} draggable/>
                        <Rect x={20}
                              y={50}
                              width={100}
                              height={100}
                              fill={'white'}
                              stroke={'black'}
                              strokeWidth={1}
                              draggable>
                        </Rect>
                    </Layer>
                </Stage>
            </div>
        </>
    )
}

export default App
