import ky from "ky";
import {API_URL} from "../../../config.ts";
import {CardType} from "../../../assets/CardType.ts";

//cardData
export const cardData = async() => {
    return ky.get(`${API_URL}/card`, {credentials: "include"}).json<CardType[]>();
}