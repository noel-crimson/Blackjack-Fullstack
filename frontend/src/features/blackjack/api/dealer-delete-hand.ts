import {CardType} from "../../../assets/CardType.ts";
import {API_URL} from "../../../config.ts";
import ky from "ky";

export const dealerDeleteHand = async () => {
    return ky.delete(`${API_URL}/card/dealercards`, {credentials: "include"});
}