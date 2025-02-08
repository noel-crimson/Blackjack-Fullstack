import {CardType} from "../../../assets/CardType.ts";
import {API_URL} from "../../../config.ts";
import ky from "ky";

export const drawCard = async () => {
    return ky.get(`${API_URL}/card/draw`, {credentials: "include"}).json<CardType>();
}