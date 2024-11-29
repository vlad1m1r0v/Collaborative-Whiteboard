import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, Input, Label,

} from "@/components/ui";
import {Pen} from "lucide-react";

const RenameButton = () => (
    <>
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={(e) => e.stopPropagation()} className={"w-full"}><Pen/> Rename</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update whiteboard</DialogTitle>
                    <DialogDescription>
                        Enter a new name for the whiteboard
                    </DialogDescription>
                </DialogHeader>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="whiteboard-name">Whiteboard name</Label>
                    <Input id="whiteboard-name" placeholder="Enter a new name for the whiteboard"/>
                </div>
                <DialogFooter>
                    <Button variant={"secondary"}>Cancel</Button>
                    <Button>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
);

export default RenameButton;