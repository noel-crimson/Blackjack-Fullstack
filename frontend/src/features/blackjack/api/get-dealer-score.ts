import {API_URL} from "../../../config.ts";
import ky from "ky";

export const getDealerScore = async () => {
    return ky.get(`${API_URL}/blackjack/dealerscore`, {credentials: "include"}).text();
}