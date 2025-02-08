import {API_URL} from "../../../config.ts";
import ky from "ky";

export const resetAllScore = async () => {
    return ky.post(`${API_URL}/blackjack/resetall`, {credentials: "include"}).text();
}