import {
    Button,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Select
} from "@/components/ui";
import UndoIcon from "/icons/undo.svg";
import RedoIcon from "/icons/redo.svg";
import SelectIcon from "/icons/select.svg";
import GrabIcon from "/icons/grab.svg";
import PenIcon from "/icons/pen.svg";
import LineIcon from "/icons/line.svg";
import ArrowIcon from "/icons/arrow.svg";
import CircleIcon from "/icons/circle.svg";
import TriangleIcon from "/icons/triangle.svg";
import RectangleIcon from "/icons/rectangle.svg";
import ThicknessIcon from "/icons/thickness.svg";
import TextIcon from "/icons/text.svg";
import TextSizeIcon from "/icons/text-size.svg";
import BrushIcon from "/icons/brush.svg";
import StrokeIcon from "/icons/stroke.svg";

const Menu = () => {
    return (
        <menu
            className={"z-10 absolute flex items-center p-2 top-5 left-1/2 -translate-x-1/2 w-max gap-1 rounded bg-slate-50 border border-gray-200 shadow-sm"}>
            <Button variant={"ghost"}>
                <img src={UndoIcon} className={"w-4 h4"} alt={"Undo"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={RedoIcon} className={"w-4 h4"} alt={"Redo"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={SelectIcon} className={"w-4 h4"} alt={"Select"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={GrabIcon} className={"w-4 h4"} alt={"Grab"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={PenIcon} className={"w-4 h4"} alt={"Pen"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={LineIcon} className={"w-4 h4"} alt={"Line"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={ArrowIcon} className={"w-4 h4"} alt={"Arrow"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={CircleIcon} className={"w-4 h4"} alt={"Circle"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={TriangleIcon} className={"w-4 h4"} alt={"Triangle"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={RectangleIcon} className={"w-4 h4"} alt={"Rectangle"}></img>
            </Button>
            <Button variant={"ghost"}>
                <img src={TextIcon} className={"w-4 h4"} alt={"Text"}></img>
            </Button>
            <Button variant={"outline"}>Import image</Button>
            {/*Thickness size*/}
            <div className={"px-4 py-2"}>
                <img src={ThicknessIcon} className={"w-4 h4"} alt={"Thickness"}></img>
            </div>
            <div>
                <Select defaultValue={"1"}>
                    <SelectTrigger className={"w-[60px]"}>
                        <SelectValue placeholder="Thickness"/>
                    </SelectTrigger>
                    <SelectContent className={"w-[60px] min-w-0"}>
                        <SelectGroup>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                <SelectItem value={String(value)}>{value}</SelectItem>))
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
                <Select defaultValue={"12"}>
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
                <input type="color" className={"w-8 h-8"} defaultValue={"#ffffff"}/>
            </div>
            {/*Stroke color*/}
            <div className={"px-4 py-2"}>
                <img src={StrokeIcon} className={"w-4 h4"} alt={"Stroke color"}></img>
            </div>
            <div>
                <input type="color" className={"w-8 h-8"} defaultValue={"black"}/>
            </div>
        </menu>
    );
};

export default Menu;