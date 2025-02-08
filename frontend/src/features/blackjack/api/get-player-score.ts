import {API_URL} from "../../../config.ts";
import ky from "ky";

export const getPlayerScore = async () => {
    return ky.get(`${API_URL}/blackjack/score`, {credentials: "include"}).text();
}