import React from "react";
import {useNavigate} from "react-router-dom";
import SelectionAction from "@/components/WhiteboardCard/SelectionAction.tsx";
import {Whiteboard} from "@/mocks/homePageData.ts";

const WhiteboardCard: React.FC<Whiteboard> = ({id, name, imageUrl, createdAt, updatedAt}) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(id);
    }

    return (
        <div key={id} className={"w-full bg-white p-2 rounded shadow-sm border border-gray-200"}>
            <div className="flex flex-row justify-end">
                <SelectionAction/>
            </div>
            <p className={"text-lg text-center my-1"}>{name}</p>
            <div className="w-full relative overflow-hidden rounded-sm aspect-video">
                <img
                    onClick={onClick}
                    className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
                    src={imageUrl}
                    alt="Whiteboard Preview"
                />
            </div>
            <div className="grid grid-columns-2 gap-1 mt-2 text-slate-500">
                <div>
                    <p className={"text-sm"}>Lastly updated: {updatedAt}</p>
                </div>
                <div>
                    <p className={"text-sm"}>Created: {createdAt}</p>
                </div>
            </div>
        </div>
    );
};

export default WhiteboardCard;