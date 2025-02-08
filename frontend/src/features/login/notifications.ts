import {showNotification} from "@mantine/notifications";

export const loginErrorNotification = () => {
    showNotification({
        color: "red",
        title: "Error",
        message: "Login failed!",
    })
}

export const createAccountErrorNotif = (errorMsg : string) => {
    showNotification({
        color: "red",
        title: "Error",
        message: errorMsg,
    })
}

export const createAccountSuccessNotif = () => {
    showNotification({
        color: "green",
        title: "Success",
        message: "Account successfully created.",
    })
}