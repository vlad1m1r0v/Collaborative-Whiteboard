import {useState} from "react";
import Konva from "konva";

export const getLimitedScale = (currScale: number, min: number, max: number) =>
    Math.max(min, Math.min(max, currScale));

const useScale = () => {
    const [stagePos, setStagePos] = useState({x: 0.0, y: 0.0});
    const [stageScale, setStageScale] = useState<number>(1.0);

    const scaleBorders = {min: 0.1, max: 10.0};

    const onWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const scaleBy = 1.05;
        const stage = e.target.getStage();
        if (!stage) return;
        const oldScale = stage.scaleX();

        const pointerPosition = stage?.getPointerPosition();
        if (!pointerPosition) return;

        const mousePointTo = {
            x: (pointerPosition.x - stage.x()) / oldScale,
            y: (pointerPosition.y - stage.y()) / oldScale,
        };

        const newScale =
            e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        const finalScale = getLimitedScale(
            newScale,
            scaleBorders.min,
            scaleBorders.max
        );

        setStageScale(finalScale);
        setStagePos({
            x: pointerPosition.x - mousePointTo.x * finalScale,
            y: pointerPosition.y - mousePointTo.y * finalScale,
        });
    };

    return {stagePos, stageScale, onWheel};
};

export default useScale;