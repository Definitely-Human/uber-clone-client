import { useApolloClient, useMutation } from "@apollo/client";
import { gql } from "../../__generated__";
import { gql as GQL } from "@apollo/client";
import { VerifyEmailMutation } from "../../__generated__/graphql";
import { useEffect } from "react";
import { useMe } from "../../hooks/useMe";
import { useNavigate } from "react-router-dom";

const VERIFY_EMAIL_MUTATION = gql(/* GraphQL */ `
    mutation verifyEmail($input: VerifyEmailInput!) {
        verifyEmail(input: $input) {
            ok
            error
        }
    }
`);

export const ConfirmEmail = () => {
    const { data: userData } = useMe();
    const navigate = useNavigate();
    const client = useApolloClient();
    const onCompleted = (data: VerifyEmailMutation) => {
        const {
            verifyEmail: { ok },
        } = data;
        if (ok && userData?.me.id) {
            client.writeFragment({
                id: `User:${userData?.me.id}`,
                fragment: GQL`
                fragment VerifiedUser on User {
                    verified
                }`,
                data: {
                    verified: true,
                },
            });
            navigate("/");
        }
    };
    const [verifyEmail] = useMutation<VerifyEmailMutation>(
        VERIFY_EMAIL_MUTATION,
        {
            onCompleted,
        }
    );
    useEffect(() => {
        const [_, code] = window.location.href.split("code=");
        verifyEmail({
            variables: {
                input: {
                    code,
                },
            },
        });
    }, []);
    return (
        <div className="mt-52 flex flex-col items-center justify-center">
            <h2 className="text-lg mb-2 font-medium">Confirming email...</h2>
            <h4 className="text-gray-700 text-sm">
                Please wait, don't close this page...
            </h4>
        </div>
    );
};
