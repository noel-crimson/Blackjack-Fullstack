import {CardType} from "../../../assets/CardType.ts";
import {API_URL} from "../../../config.ts";
import ky from "ky";

export const dealerDrawCard = async () => {
    return ky.get(`${API_URL}/card/dealerdraw`, {credentials: "include"}).json<CardType>();
}