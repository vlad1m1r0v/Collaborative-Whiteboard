import {useWhiteboard} from "@/hooks";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui";
import ThicknessIcon from "/icons/thickness.svg";

const StrokeWidthSelect = () => {
    const {selectedIds, shapes, setShapes, setHistory, strokeWidth, setStrokeWidth} = useWhiteboard();

    const onChange = (value: string) => {
        const newStrokeWidth = parseInt(value);

        setStrokeWidth(newStrokeWidth);

        const hasChanges = shapes.some(
            (shape) => selectedIds.includes(shape.id) && 'strokeWidth' in shape && shape.strokeWidth !== newStrokeWidth
        );

        if (hasChanges) {
            setHistory((prevHistory) => ({
                prev: [...prevHistory.prev, shapes],
                next: [],
            }));

            setShapes((shapes) =>
                shapes.map((shape) =>
                    selectedIds.includes(shape.id) && 'strokeWidth' in shape
                        ? {...shape, strokeWidth: newStrokeWidth}
                        : shape
                )
            );
        }
    };

    return (
        <>
            <div className={"px-4 py-2"}>
                <img src={ThicknessIcon} className={"w-4 h4"} alt={"Thickness"}></img>
            </div>
            <div>
                <Select
                    defaultValue={String(strokeWidth)}
                    onValueChange={onChange}>
                    <SelectTrigger className={"w-[60px]"}>
                        <SelectValue placeholder="Thickness"/>
                    </SelectTrigger>
                    <SelectContent className={"w-[60px] min-w-0"}>
                        <SelectGroup>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => (
                                <SelectItem key={index} value={String(value)}>{value}</SelectItem>))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default StrokeWidthSelect;