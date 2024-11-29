import SearchInput from "@/components/HomeBar/SearchInput.tsx";
import SortSelector from "@/components/HomeBar/SortSelector.tsx";
import CreateWhiteboardButton from "@/components/HomeBar/CreateWhiteboardButton.tsx";
import SearchButton from "@/components/HomeBar/SearchButton.tsx";
import JoinWhiteboardButton from "@/components/HomeBar/JoinWhiteboardButton.tsx";


const HomeBar = () => (
    <>
        <div className="mx-auto max-w-screen-xl py-4 flex items-center gap-2">
            <SearchInput/>
            <SortSelector/>
            <SearchButton/>
            <CreateWhiteboardButton/>
            <JoinWhiteboardButton/>
        </div>
    </>)
;

export default HomeBar;