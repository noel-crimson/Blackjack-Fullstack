import React, {FC} from "react";
import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {logout} from "./api/logout.ts";

export const LogoutPage: FC = () => {
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logout();
            console.log("got past await logout, navigating to login");
            navigate('/login');
        } catch (error) {
            console.log("Logout is broken");
        }
    }

    return (
        <div style = {{width: '100%'}}>
            <Button onClick = {() => handleLogOut()}>Log out</Button>
        </div>
    );
};