import React from "react";
import { isLoggedInVar } from "../apollo";

const LoggedInRouter = () => {
    return (
        <>
            <div>LoggedInRouter</div>;
            <button onClick={() => isLoggedInVar(false)}>Log out</button>
        </>
    );
};

export default LoggedInRouter;
