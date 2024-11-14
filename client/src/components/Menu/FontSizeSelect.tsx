import {useWhiteboard} from "@/hooks";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui";
import TextSizeIcon from "/icons/text-size.svg";

const FontSizeSelect = () => {
    const {fontSize, setFontSize} = useWhiteboard();
    return (
        <>
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
                            {[8, 12, 16, 20, 24, 28, 32].map((value, index) => (
                                <SelectItem key={index} value={String(value)}>{value}</SelectItem>))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}

export default FontSizeSelect;