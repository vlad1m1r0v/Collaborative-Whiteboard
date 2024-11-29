import {Ellipsis} from "lucide-react";
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui";
import RenameButton from "@/components/WhiteboardCard/RenameButton.tsx";
import DeleteButton from "@/components/WhiteboardCard/DeleteButton.tsx";

const SelectionAction = () => (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"} variant={"outline"}
                        className={"justify-self-start"}><Ellipsis/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <RenameButton/>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <DeleteButton/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
);

export default SelectionAction;