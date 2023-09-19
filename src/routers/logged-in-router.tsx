import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Restaurants from "../pages/client/Restaurants";
import Header from "../components/Header";
import { useMe } from "../hooks/useMe";
import NotFound from "../pages/NotFound";
import { ConfirmEmail } from "../pages/user/ConfirmEmail";
import EditProfile from "../pages/user/EditProfile";
import Search from "../pages/client/Search";

const ClientRouter = () => (
    <>
        <Route path="/" element={<Restaurants />}></Route>
        <Route path="/confirm" element={<ConfirmEmail />}></Route>
        <Route path="edit-profile" element={<EditProfile />}></Route>
        <Route path="search" element={<Search />}></Route>
    </>
);

const LoggedInRouter = () => {
    const { data, loading, error } = useMe();
    if (!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">
                    Loading...
                </span>
            </div>
        );
    }
    return (
        <Router>
            <Header />
            <Routes>
                {data.me.role === "Client" && ClientRouter()}

                <Route path="*" element={<NotFound />} />
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
        </Router>
    );
};

export default LoggedInRouter;
