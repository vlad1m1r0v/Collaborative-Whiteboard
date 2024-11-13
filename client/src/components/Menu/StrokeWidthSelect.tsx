import {useWhiteboard} from "@/hooks";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui";
import ThicknessIcon from "/icons/thickness.svg";

const StrokeWidthSelect = () => {
    const {strokeWidth, setStrokeWidth} = useWhiteboard();

    return (
        <>
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
        </>
    )
};

export default StrokeWidthSelect;