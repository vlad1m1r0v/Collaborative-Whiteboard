import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, Input, Label
} from "@/components/ui";
import {UsersRound} from "lucide-react";

const JoinWhiteboardButton = () => (
    <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary"><UsersRound/>Join existing whiteboard</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Join existing whiteboard</DialogTitle>
                    <DialogDescription>
                        Enter an ID of existing whiteboard
                    </DialogDescription>
                </DialogHeader>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="whiteboard-name">Whiteboard ID</Label>
                    <Input id="whiteboard-name" placeholder="Enter an ID of existing whiteboard"/>
                </div>
                <DialogFooter>
                    <Button variant={"secondary"}>Cancel</Button>
                    <Button>Join</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
);

export default JoinWhiteboardButton;