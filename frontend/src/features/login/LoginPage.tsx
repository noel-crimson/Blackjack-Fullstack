import {useForm} from "@mantine/form";
import React, {FC} from "react";
import {Button, Stack, TextInput} from "@mantine/core";
import {login} from "./api/login.ts";
import {loginErrorNotification} from "./notifications.ts";
import {useNavigate} from "react-router-dom";

type LoginFormType = {
    email: string;
    password: string;
}

export const LoginPage: FC = () => {
    const navigate = useNavigate();

    const form = useForm<LoginFormType>({
      initialValues: {
          email:'',
          password:'',
      }
    })

    const handleSubmit = async (data: LoginFormType) => {
        try {
            console.log("await login");
            await login(data.email, data.password);
            console.log("navigating to /blackjack");
            navigate('/blackjack');
        } catch (error) {
            loginErrorNotification();
        }
    }

    const handleCreateAccount = async() => {
        try{
            console.log("create account");
            navigate('/createaccount');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style = {{width: '100%'}}>
            Login:
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <Stack gap={"md"}>
                    <TextInput required type = "email" label = "Email" {...form.getInputProps("email")}/>
                    <TextInput required type = "password" label = "Password" {...form.getInputProps("password")}/>
                    <Button type = "submit">Login</Button>
                    <Button onClick={() => handleCreateAccount()}>Create account</Button>
                </Stack>
            </form>
        </div>
    );
};