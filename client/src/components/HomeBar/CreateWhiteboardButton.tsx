import {CirclePlus} from "lucide-react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, Input, Label
} from "@/components/ui";

const CreateWhiteboardButton = () => (
    <>
        <Dialog>
            <DialogTrigger asChild>
                <Button><CirclePlus/>Create new whiteboard</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create whiteboard</DialogTitle>
                    <DialogDescription>
                        Enter a name for the whiteboard
                    </DialogDescription>
                </DialogHeader>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="whiteboard-name">Whiteboard name</Label>
                    <Input id="whiteboard-name" placeholder="Enter a name for the whiteboard"/>
                </div>
                <DialogFooter>
                    <Button variant={"secondary"}>Cancel</Button>
                    <Button>Create and join collaboration session</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
);

export default CreateWhiteboardButton;