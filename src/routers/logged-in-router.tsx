import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";
import { MeQuery } from "../__generated__/graphql";
import {
    Route,
    BrowserRouter as Router,
    Routes,
    Navigate,
} from "react-router-dom";
import Restaurants from "../pages/client/restaurants";

const ClientRouter = () => (
    <>
        <Route path="/" element={<Restaurants />}></Route>
    </>
);

const ME_QUERY = gql(/* GraphQL */ `
    query me {
        me {
            id
            email
            role
            verified
        }
    }
`);

const LoggedInRouter = () => {
    const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);
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
            <Routes>
                {data.me.role === "Client" && ClientRouter()}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default LoggedInRouter;
