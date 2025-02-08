import {CardType} from "../../../assets/CardType.ts";
import {API_URL} from "../../../config.ts";
import ky from "ky";

export const shuffleDeck = async () => {
    return ky.post(`${API_URL}/card/shuffle`, {credentials: "include"}).json<CardType>();
}