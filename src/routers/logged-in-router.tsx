import React from "react";
import { isLoggedInVar } from "../apollo";
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";
import { MeQuery } from "../__generated__/graphql";

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
        <>
            <div>{data.me.role}</div>;
        </>
    );
};

export default LoggedInRouter;
