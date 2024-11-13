import {useWhiteboard} from "@/hooks";
import BrushIcon from "/icons/brush.svg";

const FillColorPicker = () => {
    const {fillColor, setFillColor} = useWhiteboard();

    return (
        <>
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
        </>
    )
}

export default FillColorPicker;