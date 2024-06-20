import { createBrowserRouter } from "react-router-dom";
import Home from './pages/home'
import ErrorPage from "./pages/error/errorPage";
import FairMint from "./pages/fairMint";
import Bridge from "./pages/bridge";
import Stake from "./pages/stake";


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
        path: "/stake",
        element: <Stake/>
     }
]);
export default router;