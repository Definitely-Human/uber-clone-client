import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import { useMutation } from "@apollo/client";
import { gql } from "../gql";

const LOGIN_MUTATION = gql(/* GraphQL */ `
    mutation my_login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
            ok
            token
        }
    }
`);

interface ILoginForm {
    email: string;
    password: string;
}

const Login = () => {
    const {
        register,
        getValues,
        formState: { errors },
        handleSubmit,
    } = useForm<ILoginForm>();
    const [loginMutation, { data }] = useMutation(LOGIN_MUTATION);
    const onSubmit = () => {
        const { email, password } = getValues();
        loginMutation({
            variables: {
                email,
                password,
            },
        });
    };
    console.log(data);
    return (
        <div className="h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white w-full max-w-lg pt-7 pb-7 rounded-lg text-center">
                <h3 className=" text-2xl text-gray-800">Log In</h3>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-3 my-5 px-5"
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
                    {errors.email?.message && (
                        <FormError errorMessage={errors.email?.message} />
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
                    {errors.password?.message && (
                        <FormError errorMessage={errors.password?.message} />
                    )}

                    <button className="mt-3 btn">Log In</button>
                </form>
            </div>
        </div>
    );
};
export default Login;
