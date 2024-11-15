import {useWhiteboard} from "@/hooks";
import BrushIcon from "/icons/brush.svg";

const FillColorPicker = () => {
    const {selectedIds, shapes, setShapes, setHistory, fillColor, setFillColor} = useWhiteboard();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setFillColor(value);

        const hasChanges = shapes.some(
            (shape) => selectedIds.includes(shape.id) && 'fill' in shape && shape.fill !== value
        );

        if (hasChanges) {
            setHistory((prevHistory) => ({
                prev: [...prevHistory.prev, shapes],
                next: [],
            }));

            setShapes((shapes) =>
                shapes.map((shape) =>
                    selectedIds.includes(shape.id) && 'fill' in shape
                        ? {...shape, fill: value}
                        : shape
                )
            );
        }
    };

    return (
        <>
            <div className={"px-4 py-2"}>
                <img src={BrushIcon} className={"w-4 h-4"} alt={"Fill color"}></img>
            </div>
            <div>
                <input
                    type="color"
                    className={"w-8 h-8"}
                    defaultValue={fillColor}
                    onChange={onChange}
                />
            </div>
        </>
    );
};

export default FillColorPicker;