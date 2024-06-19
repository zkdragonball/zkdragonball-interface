import { createBrowserRouter } from "react-router-dom";
import Home from './pages/home'
import ErrorPage from "./pages/error/errorPage";
import FairMint from "./pages/fairMint";
import Bridge from "./pages/bridge";
import Earn from "./pages/earn";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/fairMint",
        element: <FairMint/>
    },
    {
        path: "/bridge",
        element: <Bridge/>
    },
    {
        path: "/earn",
        element: <Earn/>
     }
]);
export default router;