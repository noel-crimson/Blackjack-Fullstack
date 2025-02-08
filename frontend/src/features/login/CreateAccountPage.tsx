import {useForm} from "@mantine/form";
import React, {FC} from "react";
import {Button, Stack, TextInput} from "@mantine/core";
import {login} from "./api/login.ts";
import {createAccountErrorNotif, createAccountSuccessNotif, loginErrorNotification} from "./notifications.ts";
import {useNavigate} from "react-router-dom";
import {createaccount} from "./api/createaccount.ts";

type CreateAccountFormType = {
    email: string;
    password: string;
    confirmPassword: string;
}

export const CreateAccountPage: FC = () => {
    const navigate = useNavigate();

    const form = useForm<CreateAccountFormType>({
        initialValues: {
            email:'',
            password:'',
            confirmPassword: '',
        },
        validate: {
            confirmPassword: (value, values) =>
            {

                if (value !== values.password)
                {
                    createAccountErrorNotif("Passwords do not match.");
                    throw new Error();
                }
            }
        },
    })

    const handleSubmit = async (data: CreateAccountFormType) => {
        try {
            console.log("attempt account creation");
            await createaccount(data.email, data.password);
            console.log("successfully made account, logging in");
            await login(data.email, data.password);
            console.log("navigating to /blackjack");
            createAccountSuccessNotif();
            navigate('/blackjack');
        } catch (error) {

        }
    }

    const handleReturn = async() => {
        try{
            console.log("back to login");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style = {{width: '100%'}}>
            Create account:
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <Stack gap={"md"}>
                    <TextInput required type = "email" label = "Email" {...form.getInputProps("email")}/>
                    <TextInput required type = "password" label = "Password" {...form.getInputProps("password")}/>
                    <TextInput required type = "password" label = "Re-enter password" {...form.getInputProps("confirmPassword")}/>
                    <Button type = "submit">Create account</Button>
                    <Button onClick={() => handleReturn()}>Return to login</Button>
                </Stack>
            </form>
        </div>
    );
};