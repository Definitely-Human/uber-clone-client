import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import { useMutation } from "@apollo/client";
import { gql } from "../__generated__";
import { My_LoginMutation } from "../__generated__/graphql";
import logo from "../images/logo.svg";
import Button from "../components/button";
import { Link } from "react-router-dom";

const LOGIN_MUTATION = gql(/* GraphQL */ `
    mutation my_login($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            token
            error
        }
    }
`);

interface ILoginForm {
    email: string;
    password: string;
}

const Login = () => {
    const { register, getValues, formState, handleSubmit } =
        useForm<ILoginForm>({ mode: "onBlur" });
    const onCompleted = (data: My_LoginMutation) => {
        console.log(data);
    };

    const [loginMutation, { data: loginMutationResult, loading }] = useMutation(
        LOGIN_MUTATION,
        {
            onCompleted,
        }
    );
    const onSubmit = () => {
        if (!loading) {
            const { email, password } = getValues();
            loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password,
                    },
                },
            });
        }
    };
    return (
        <div className="h-screen flex items-center flex-col pt-10 lg:pt-32">
            <div className="w-full max-w-screen-sm flex px-5 flex-col items-center">
                <img src={logo} alt="logo" className="w-60 mb-10" />
                <h4 className="w-full text-left text-3xl mb-5 font-medium">
                    Welcome back
                </h4>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-3 my-5 w-full"
                >
                    <input
                        {...register("email", {
                            required: "Email is required.",
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

                    <Button
                        canClick={formState.isValid}
                        loading={loading}
                        actionText="Log In"
                    />
                    {loginMutationResult?.login.error && (
                        <FormError
                            errorMessage={loginMutationResult.login.error}
                        />
                    )}
                </form>
                <div>
                    New to Uber?{" "}
                    <Link
                        to="/create-account"
                        className="text-lime-600 hover:underline"
                    >
                        Create an Account!
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Login;
