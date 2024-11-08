import {Button, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui";
import UndoIcon from "/icons/undo.svg";
import RedoIcon from "/icons/redo.svg";
import SelectIcon from "/icons/select.svg";
import GrabIcon from "/icons/grab.svg";
import PenIcon from "/icons/pen.svg";
import LineIcon from "/icons/line.svg";
import ArrowIcon from "/icons/arrow.svg";
import EllipseIcon from "/icons/ellipse.svg";
import TriangleIcon from "/icons/triangle.svg";
import RectangleIcon from "/icons/rectangle.svg";
import ThicknessIcon from "/icons/thickness.svg";
import TextIcon from "/icons/text.svg";
import TextSizeIcon from "/icons/text-size.svg";
import BrushIcon from "/icons/brush.svg";
import StrokeIcon from "/icons/stroke.svg";
import {useContext} from "react";
import {WhiteboardContext} from "@/context";
import {ToolType} from "@/types";
import {clsx} from "clsx";

interface ToolButtonProps {
    icon: string;
    tool: ToolType;
}

const toolButtons: ToolButtonProps[] = [
    {
        icon: SelectIcon,
        tool: ToolType.SELECT,
    },
    {
        icon: GrabIcon,
        tool: ToolType.GRAB,
    },
    {
        icon: PenIcon,
        tool: ToolType.PEN,
    },
    {
        icon: LineIcon,
        tool: ToolType.LINE,
    },
    {
        icon: ArrowIcon,
        tool: ToolType.ARROW,
    },
    {
        icon: EllipseIcon,
        tool: ToolType.ELLIPSE
    },
    {
        icon: TriangleIcon,
        tool: ToolType.TRIANGLE,
    },
    {
        icon: RectangleIcon,
        tool: ToolType.RECTANGLE,
    },
    {
        icon: TextIcon,
        tool: ToolType.TEXT,
    },
];

const Menu = () => {
    const {
        tool,
        setTool,
        strokeWidth,
        setStrokeWidth,
        fontSize,
        setFontSize,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor
    } = useContext(WhiteboardContext);

    return (
        <menu
            className={"z-10 absolute flex items-center p-2 top-5 left-1/2 -translate-x-1/2 w-max gap-1 rounded bg-slate-50 border border-gray-200 shadow-sm"}>
            <Button variant={"ghost"}>
                <img src={UndoIcon} className={"w-4 h4"} alt={"Undo"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={RedoIcon} className={"w-4 h4"} alt={"Redo"}></img>
            </Button>
            {
                toolButtons.map((toolButton) => (
                    <Button
                        variant={"ghost"}
                        className={clsx({"bg-blue-100": tool === toolButton.tool})}
                        onClick={() => setTool(toolButton.tool)}>
                        <img
                            className={"w-4 h4"}
                            src={toolButton.icon}
                            alt={toolButton.tool.toLowerCase()}/>
                    </Button>
                ))
            }
            <Button variant={"outline"}>Import image</Button>
            {/*Stroke width*/}
            <div className={"px-4 py-2"}>
                <img src={ThicknessIcon} className={"w-4 h4"} alt={"Thickness"}></img>
            </div>
            <div>
                <Select
                    defaultValue={String(strokeWidth)}
                    onValueChange={(value) => setStrokeWidth(parseInt(value))}>
                    <SelectTrigger className={"w-[60px]"}>
                        <SelectValue placeholder="Thickness"/>
                    </SelectTrigger>
                    <SelectContent className={"w-[60px] min-w-0"}>
                        <SelectGroup>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                <SelectItem
                                    value={String(value)}>{value}</SelectItem>))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {/*Font size*/}
            <div className={"px-4 py-2"}>
                <img src={TextSizeIcon} className={"w-4 h4"} alt={"Font size"}></img>
            </div>
            <div>
                <Select
                    defaultValue={String(fontSize)}
                    onValueChange={(value) => setFontSize(parseInt(value))}>
                    <SelectTrigger className={"w-[60px]"}>
                        <SelectValue placeholder="Font"/>
                    </SelectTrigger>
                    <SelectContent className={"w-[60px] min-w-0"}>
                        <SelectGroup>
                            {[8, 12, 16, 20, 24, 28, 32].map((value) => (
                                <SelectItem value={String(value)}>{value}</SelectItem>))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {/*Fill color*/}
            <div className={"px-4 py-2"}>
                <img src={BrushIcon} className={"w-4 h4"} alt={"Fill color"}></img>
            </div>
            <div>
                <input
                    type="color"
                    className={"w-8 h-8"}
                    defaultValue={fillColor}
                    onChange={(e) => setFillColor(e.target.value)}/>
            </div>
            {/*Stroke color*/}
            <div className={"px-4 py-2"}>
                <img src={StrokeIcon} className={"w-4 h4"} alt={"Stroke color"}></img>
            </div>
            <div>
                <input
                    type="color"
                    className={"w-8 h-8"}
                    defaultValue={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}/>
            </div>
        </menu>
    );
};

export default Menu;