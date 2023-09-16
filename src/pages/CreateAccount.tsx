import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import { useMutation } from "@apollo/client";
import { gql } from "../__generated__";
import { CreateAccountMutation, UserRole } from "../__generated__/graphql";
import logo from "../images/logo.svg";
import Button from "../components/Button";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CREATE_ACCOUNT_MUTATION = gql(/* GraphQL */ `
    mutation createAccount($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`);

interface ICreateAccountForm {
    email: string;
    password: string;
    role: UserRole;
}

const CreateAccount = () => {
    const navigate = useNavigate();
    const { register, getValues, formState, watch, handleSubmit } =
        useForm<ICreateAccountForm>({ mode: "onBlur" });
    const onCompleted = (data: CreateAccountMutation) => {
        const {
            createAccount: { ok, error },
        } = data;
        if (ok) {
            navigate("/");
        }
    };

    const [loginMutation, { data: createAccountMutationResult, loading }] =
        useMutation(CREATE_ACCOUNT_MUTATION, {
            onCompleted,
        });
    const onSubmit = () => {
        if (!loading) {
            const { email, password, role } = getValues();
            loginMutation({
                variables: {
                    createAccountInput: {
                        email,
                        password,
                        role,
                    },
                },
            });
        }
    };
    console.log(watch());
    return (
        <div className="h-screen flex items-center flex-col pt-10 lg:pt-32">
            <Helmet>
                <title>Uber | Create Account</title>
            </Helmet>
            <div className="w-full max-w-screen-sm flex px-5 flex-col items-center">
                <img src={logo} alt="logo" className="w-60 mb-10" />
                <h4 className="w-full text-left text-3xl mb-5 font-medium">
                    Let's get started
                </h4>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-3 my-5 w-full"
                >
                    <input
                        {...register("email", {
                            required: "Email is required.",
                            pattern:
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        type="email"
                        required
                        placeholder="Email"
                        className="input"
                    />
                    {formState.errors.email?.message && (
                        <FormError
                            errorMessage={formState.errors.email?.message}
                        />
                    )}
                    {formState.errors.email?.type === "pattern" && (
                        <FormError
                            errorMessage={"Please enter a valid email."}
                        />
                    )}
                    <input
                        {...register("password", {
                            required: "Password is required.",
                        })}
                        type="password"
                        required
                        placeholder="Password"
                        className="input"
                    />
                    {formState.errors.password?.message && (
                        <FormError
                            errorMessage={formState.errors.password?.message}
                        />
                    )}
                    <select
                        {...register("role", { required: "Role is required." })}
                        className="input"
                    >
                        {Object.keys(UserRole).map((role, index) => (
                            <option key={index}>{role}</option>
                        ))}
                    </select>
                    <Button
                        canClick={formState.isValid}
                        loading={loading}
                        actionText="Create Account"
                    />
                    {createAccountMutationResult?.createAccount.error && (
                        <FormError
                            errorMessage={
                                createAccountMutationResult.createAccount.error
                            }
                        />
                    )}
                </form>
                <div>
                    Already have an account?{" "}
                    <Link to="/" className="text-lime-600 hover:underline">
                        Log in now!
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default CreateAccount;
