import Scribble from "@/components/Shapes/Scribble";
import Line from "@/components/Shapes/Line";
import Arrow from "@/components/Shapes/Arrow";
import Ellipse from "@/components/Shapes/Ellipse";
import Triangle from "@/components/Shapes/Triangle";
import Rectangle from "@/components/Shapes/Rectangle";
import Text from "@/components/Shapes/Text";
import Image from "@/components/Shapes/Image";
import {useWhiteboard} from "@/hooks";
import {Shape, ShapeType} from "@/types";

const Shapes: React.FC = () => {
    const {shapes} = useWhiteboard();

    return shapes.map((shape: Shape) => {
        if (shape.shapeType === ShapeType.SCRIBBLE) {
            return <Scribble shape={shape}/>
        }

        if (shape.shapeType === ShapeType.LINE) {
            return <Line shape={shape}/>
        }

        if (shape.shapeType === ShapeType.ARROW) {
            return <Arrow shape={shape}/>
        }

        if (shape.shapeType === ShapeType.ELLIPSE) {
            return <Ellipse shape={shape}/>
        }

        if (shape.shapeType === ShapeType.TRIANGLE) {
            return <Triangle shape={shape}/>
        }

        if (shape.shapeType === ShapeType.RECTANGLE) {
            return <Rectangle shape={shape}/>
        }

        if (shape.shapeType === ShapeType.TEXT) {
            return <Text shape={shape}/>
        }

        if (shape.shapeType === ShapeType.IMAGE) {
            return <Image shape={shape}/>
        }
    })
}

export default Shapes;