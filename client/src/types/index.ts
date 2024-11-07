enum ToolType {
    SELECT = "SELECT",
    GRAB = "GRAB",
    PEN = "PEN",
    LINE = "LINE",
    ARROW = "ARROW",
    CIRCLE = "CIRCLE",
    TRIANGLE = "TRIANGLE",
    RECTANGLE = "RECTANGLE",
    TEXT = "TEXT",
}

enum ShapeType {
    SCRIBBLE = "SCRIBBLE",
    TEXT = "TEXT",
    LINE = "LINE",
    ARROW = "ARROW",
    CIRCLE = "CIRCLE",
    TRIANGLE = "TRIANGLE",
    RECTANGLE = "RECTANGLE",
    IMAGE = "IMAGE"
}

interface LineShape {
    shapeType: ShapeType.LINE,
    id: string,
    points: number[],
    stroke: string,
    strokeWidth: number,
    offsetX: number,
    offsetY: number,
    scaleX: number,
    scaleY: number,
    rotation: number
}

interface ScribbleShape {
    shapeType: ShapeType.SCRIBBLE,
    id: string,
    points: number[],
    stroke: string,
    strokeWidth: number,
    offsetX: number,
    offsetY: number,
    scaleX: number,
    scaleY: number,
    rotation: number
}

interface TextShape {
    shapeType: ShapeType.TEXT,
    id: string,
    x: number,
    y: number,
    text: string,
    fontSize: number,
    width?: number,
    scaleX: number,
    // No scaleY. Height will be determined automatically depending on a text size (length and font size)
    // and width of a text container that will be calculated as initial text width * scaleX
    offsetX: number,
    offsetY: number,
    rotation: number
}





