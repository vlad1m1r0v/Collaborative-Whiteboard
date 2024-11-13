import {useWhiteboard} from "@/hooks";
import StrokeIcon from "/icons/stroke.svg";

const StrokeColorPicker = () => {
    const {strokeColor, setStrokeColor} = useWhiteboard();

    return (
        <>
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
        </>
    )
}

export default StrokeColorPicker;
