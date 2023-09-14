import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";

const LoggedOutRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<p>error</p>} />
            </Routes>
        </Router>
    );
};

export default LoggedOutRouter;
