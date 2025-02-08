import {API_URL} from "../../../config.ts";

export const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: 'include',
    });

    console.log("response.status = " + response.status);
    if (response.status !== 200) throw new Error("Login failed");
    console.log("Logout successful!");
    return await response.text();
}