import {API_URL} from "../../../config.ts";
import {createAccountErrorNotif} from "../notifications.ts";

export const createaccount = async (email: string, password:string ) => {
    const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });

    console.log("User creation status: " + response.status);
    if (response.status == 409)
    {
        createAccountErrorNotif("User with this email already exists.");
    }

    if (response.status == 400)
    {
        createAccountErrorNotif("Password must be at least 8 characters, and email must be valid.");
    }

    if (response.status !== 201) {
        throw new Error("User creation failed");
    }
    console.log("User created!");
    return await response.json();
}