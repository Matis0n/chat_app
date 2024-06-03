import {Route, Routes} from "react-router-dom";
import Main from "../components/Main.tsx";
import Chat from "../components/Chat.tsx";

function AppRoutes() {

    return (
        <Routes>
            <Route path={"/"} element={<Main/>}/>
            <Route path={"/chat"} element={<Chat/>}/>
        </Routes>
    )
}

export default AppRoutes
