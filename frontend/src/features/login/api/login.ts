import {API_URL} from "../../../config.ts";

export const login = async (username: string, password:string ) => {
    console.log('API_URL:', API_URL);
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            ContentType: 'application/json',
            Authorization: 'Basic ' + window.btoa(username + ":" + password),
        },
        credentials: 'include',
    });

    console.log("Status: " + response.status);
    if (response.status !== 200) throw new Error("Login failed");
    console.log("Success!");
    return await response.text();
}