import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage, WhiteboardPage, RedirectPage} from "@/pages";
import {WhiteboardProvider} from "@/context";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="redirect" element={<RedirectPage/>}/>
                <Route path="whiteboards/" element={<HomePage/>}/>
                <Route path="whiteboards/:uuid" element={
                    <WhiteboardProvider>
                        <WhiteboardPage/>
                    </WhiteboardProvider>
                }/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;