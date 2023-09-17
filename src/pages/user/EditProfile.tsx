import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { useMe } from "../../hooks/useMe";
import { gql } from "../../__generated__";
import { gql as GQL } from "@apollo/client";
import { useApolloClient, useMutation } from "@apollo/client";
import { EditProfileMutation } from "../../__generated__/graphql";

const EDIT_PROFILE_MUTATION = gql(/* GraphQL */ `
    mutation editProfile($input: EditProfileInput!) {
        editProfile(input: $input) {
            ok
            error
        }
    }
`);

const EDIT_EMAIL_FRAGMENT = gql(/* GraphQL */ `
    fragment EditedUser on User {
        verified
        email
    }
`);

interface IFormProps {
    email?: string;
    password?: string;
}

const EditProfile = () => {
    const { data: userData } = useMe();
    const client = useApolloClient();
    const onCompleted = (data: EditProfileMutation) => {
        const {
            editProfile: { ok },
        } = data;
        if (ok && userData) {
            const {
                me: { email: prevEmail, id },
            } = userData;
            const { email: newEmail } = getValues();
            if (prevEmail !== newEmail && newEmail) {
                client.writeFragment({
                    id: `User:${id}`,
                    fragment: EDIT_EMAIL_FRAGMENT,
                    data: {
                        email: newEmail,
                        verified: false,
                    },
                });
            }
        }
    };
    const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
        onCompleted,
    });
    const { register, handleSubmit, getValues, formState } =
        useForm<IFormProps>({
            mode: "onChange",
            defaultValues: {
                email: userData?.me.email,
            },
        });
    const onSubmit = () => {
        const { email, password } = getValues();
        editProfile({
            variables: {
                input: {
                    email,
                    ...(password !== "" && { password }),
                },
            },
        });
    };
    return (
        <div className="mt-52 flex flex-col justify-center items-center">
            <h4 className="font-semibold text-2xl mb-3">Edit profile</h4>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
            >
                <input
                    {...register("email", {
                        pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    className="input"
                    type="email"
                    placeholder="Email"
                />
                <input
                    {...register("password")}
                    className="input"
                    type="password"
                    placeholder="Password"
                />
                <Button
                    loading={loading}
                    canClick={formState.isValid}
                    actionText="Save Profile"
                />
            </form>
        </div>
    );
};
export default EditProfile;
