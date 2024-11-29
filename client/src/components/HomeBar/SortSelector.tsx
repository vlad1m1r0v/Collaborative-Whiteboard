import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui";

const SortSelector = () => (
    <>
        <Select>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="last-updated">Lastly updated </SelectItem>
                <SelectItem value="last-created">Lastly created </SelectItem>
            </SelectContent>
        </Select>
    </>
);

export default SortSelector;