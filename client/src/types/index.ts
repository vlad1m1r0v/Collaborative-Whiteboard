enum ToolType {
    SELECT = "SELECT",
    GRAB = "GRAB",
    PEN = "PEN",
    LINE = "LINE",
    ARROW = "ARROW",
    ELLIPSE = "ELLIPSE",
    TRIANGLE = "TRIANGLE",
    RECTANGLE = "RECTANGLE",
    TEXT = "TEXT",
}

enum ShapeType {
    SCRIBBLE = "SCRIBBLE",
    LINE = "LINE",
    ARROW = "ARROW",
    ELLIPSE = "ELLIPSE",
    TRIANGLE = "TRIANGLE",
    RECTANGLE = "RECTANGLE",
    TEXT = "TEXT",
    // IMAGE = "IMAGE"
}

interface ScribbleShape {
    shapeType: ShapeType.SCRIBBLE,
    id: string,
    points: number[],
    stroke: string,
    strokeWidth: number,
    rotation: number,
}

interface LineShape {
    shapeType: ShapeType.LINE,
    id: string,
    points: number[],
    stroke: string,
    strokeWidth: number,
    rotation: number
}

interface ArrowShape {
    shapeType: ShapeType.ARROW,
    id: string,
    points: number[],
    stroke: string,
    strokeWidth: number,
    fill: string,
    rotation: number,
}

interface EllipseShape {
    shapeType: ShapeType.ELLIPSE,
    id: string,
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    stroke: string,
    strokeWidth: number,
    fill: string,
    rotation: number
}

interface TriangleShape {
    shapeType: ShapeType.TRIANGLE,
    id: string,
    x: number,
    y: number,
    radius: number,
    stroke: string,
    strokeWidth: string,
    fill: string,
    rotation: number,
}

interface RectangleShape {
    shapeType: ShapeType.RECTANGLE,
    id: string,
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    stroke: number,
    strokeWidth: number,
    fill: string,
    rotation: number
}


interface TextShape {
    shapeType: ShapeType.TEXT,
    id: string,
    x: number,
    y: number,
    text: string,
    fontSize: number,
    rotation: number,
    width?: number,
}

type Shape = ScribbleShape | LineShape | ArrowShape | EllipseShape | TriangleShape | RectangleShape | TextShape;

export {
    ToolType,
    ShapeType,
    type Shape,
}





