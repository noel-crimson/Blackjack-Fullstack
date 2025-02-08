import {API_URL} from "../../../config.ts";
import ky from "ky";

export const resetPlayerScore = async () => {
    return ky.post(`${API_URL}/blackjack/reset`, {credentials: "include"}).text();
}