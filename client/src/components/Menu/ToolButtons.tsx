import {Button} from "@/components/ui";
import SelectIcon from "/icons/select.svg";
import GrabIcon from "/icons/grab.svg";
import PenIcon from "/icons/pen.svg";
import LineIcon from "/icons/line.svg";
import ArrowIcon from "/icons/arrow.svg";
import EllipseIcon from "/icons/ellipse.svg";
import TriangleIcon from "/icons/triangle.svg";
import RectangleIcon from "/icons/rectangle.svg";
import TextIcon from "/icons/text.svg";
import {ToolType} from "@/types";
import {clsx} from "clsx";
import {useWhiteboard} from "@/hooks";

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


const ToolButtons = () => {
    const {tool, setTool} = useWhiteboard();

    return (toolButtons.map((toolButton) => (
        <Button
            key={toolButton.tool}
            variant={"ghost"}
            className={clsx({"bg-blue-100": tool === toolButton.tool})}
            onClick={() => setTool(toolButton.tool)}>
            <img
                className={"w-4 h4"}
                src={toolButton.icon}
                alt={toolButton.tool.toLowerCase()}/>
        </Button>
    )))
};

export default ToolButtons;