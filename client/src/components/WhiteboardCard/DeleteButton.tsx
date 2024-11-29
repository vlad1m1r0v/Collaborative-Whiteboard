import {Trash2} from "lucide-react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui";

const DeleteButton = () => (
    <>
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={(e) => e.stopPropagation()} className={"w-full"} variant={"destructive"}><Trash2/> Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Warning</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete whiteboard?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={"secondary"}>Cancel</Button>
                    <Button variant={"destructive"}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
);

export default DeleteButton;