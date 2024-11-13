import UndoIcon from "/icons/undo.svg";
import RedoIcon from "/icons/redo.svg";
import {Button} from "@/components/ui";
import {useWhiteboard} from "@/hooks";


const UndoButton = () => {
    const {history, setHistory, shapes, setShapes} = useWhiteboard();

    const onUndoButtonClick = () => {
        const rest = history.prev.slice(0, -1); // Всі елементи, крім останнього
        const prevShapeState = history.prev[history.prev.length - 1]; // Останній елемент

        setHistory((prevHistory) => (
            {
                prev: rest,
                next: [shapes, ...prevHistory.next]
            }
        ));

        setShapes(() => prevShapeState);
    };

    return (
        <Button variant={"ghost"} disabled={!history.prev.length} onClick={onUndoButtonClick}>
            <img src={UndoIcon} className={"w-4 h4"} alt={"Redo"}></img>
        </Button>
    );
};

const RedoButton = () => {
    const {history, setHistory, shapes, setShapes} = useWhiteboard();

    const onRedoButtonClick = () => {
        const [nextShapeState, ...rest] = history.next;

        setHistory((prevHistory) => (
            {
                prev: [...prevHistory.prev, shapes],
                next: [...rest],
            }
        ));

        setShapes(() => nextShapeState);
    };

    return (
        <>
            <Button variant={"ghost"} disabled={!history.next.length} onClick={onRedoButtonClick}>
                <img src={RedoIcon} className={"w-4 h4"} alt={"Redo"}></img>
            </Button>
        </>
    )
};

export {UndoButton, RedoButton};
