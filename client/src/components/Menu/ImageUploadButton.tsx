import {ChangeEvent, useRef} from "react";
import {nanoid} from "nanoid";

import {useWhiteboard} from "@/hooks";
import {ShapeType} from "@/types";
import {Button} from "@/components/ui";

const ImageUploadButton = () => {
    const {shapes, setShapes, setHistory} = useWhiteboard();

    const hiddenFileInputRef = useRef<HTMLInputElement>(null);

    const onFileUploadButtonClick = () => {
        hiddenFileInputRef.current?.click();
    }

    const onHiddenFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const image = new Image();
            image.src = imageUrl;

            image.onload = () => {
                setHistory((prevHistory) => ({
                    prev: [...prevHistory.prev, shapes],
                    next: []
                }))

                setShapes((prevShapes) => [...prevShapes,
                    {
                        id: nanoid(),
                        shapeType: ShapeType.IMAGE,
                        x: (window.innerWidth - image.naturalWidth) / 2,
                        y: (window.innerHeight - image.naturalHeight) / 2,
                        width: image.naturalWidth,
                        height: image.naturalHeight,
                        image: image,
                        rotation: 0,
                    }]);
            };
        }
    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={onHiddenFileInputChange}
                ref={hiddenFileInputRef}
                style={{display: 'none'}}
            />
            <Button onClick={onFileUploadButtonClick} variant={"outline"}>Import image</Button>
        </>
    )
}

export default ImageUploadButton;