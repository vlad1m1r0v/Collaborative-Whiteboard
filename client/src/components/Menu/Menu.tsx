import ToolButtons from "@/components/Menu/ToolButtons.tsx";
import ImageUploadButton from "@/components/Menu/ImageUploadButton.tsx";
import StrokeWidthSelect from "@/components/Menu/StrokeWidthSelect.tsx";
import FontSizeSelect from "@/components/Menu/FontSizeSelect.tsx";
import FillColorPicker from "@/components/Menu/FillColorPicker.tsx";
import StrokeColorPicker from "@/components/Menu/StrokeColorPicker.tsx";
import {UndoButton, RedoButton} from "@/components/Menu/UndoRedoButtons.tsx";


const Menu = () => {
    return (
        <menu
            className={"z-10 absolute flex items-center p-2 top-5 left-1/2 -translate-x-1/2 w-max gap-1 rounded bg-slate-50 border border-gray-200 shadow-sm"}>
            {/*Undo Button*/}
            <UndoButton/>
            {/*Redo Button*/}
            <RedoButton/>
            {/*Tool Buttons*/}
            <ToolButtons/>
            {/*Image Upload*/}
            <ImageUploadButton/>
            {/*Stroke width*/}
            <StrokeWidthSelect/>
            {/*Font size*/}
            <FontSizeSelect/>
            {/*Fill color*/}
            <FillColorPicker/>
            {/*Stroke color*/}
            <StrokeColorPicker/>
        </menu>
    );
};

export default Menu;