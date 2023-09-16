import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Restaurants from "../pages/client/restaurants";
import Header from "../components/Header";
import { useMe } from "../hooks/useMe";
import NotFound from "../pages/NotFound";
import { ConfirmEmail } from "../pages/user/ConfirmEmail";

const ClientRouter = () => (
    <>
        <Route path="/" element={<Restaurants />}></Route>
        <Route path="/confirm" element={<ConfirmEmail />}></Route>
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
