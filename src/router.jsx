import { createBrowserRouter } from "react-router-dom";
import Home from './pages/home'
import ErrorPage from "./pages/error/errorPage";
import FairMint from "./pages/fairMint";
import Stake from "./pages/stake";
import Airdrop from "./pages/airdrop";
import Treasury from "./pages/treasury";



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
        path: "/stake",
        element: <Stake/>
     },
    //  {
    //     path: "/treasury",
    //     element: <Treasury/>
    // },
    {
        path: "/airdrop",
        element: <Airdrop/>
    },
]);
export default router;