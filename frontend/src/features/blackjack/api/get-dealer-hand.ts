import {API_URL} from "../../../config.ts";
import ky from "ky";
import {CardType} from "../../../assets/CardType.ts";

export const getDealerHand = async () => {
    return ky.get(`${API_URL}/card/dealer`, {credentials: "include"}).json<CardType[]>();
}