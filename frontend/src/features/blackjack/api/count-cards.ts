import {CardType} from "../../../assets/CardType.ts";
import {API_URL} from "../../../config.ts";
import ky from "ky";

export const countCards = async () => {
    return ky.get(`${API_URL}/card/count`, {credentials: "include"}).text();
}