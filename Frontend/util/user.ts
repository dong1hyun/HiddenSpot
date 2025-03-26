import { API_URL } from "@env";
import { UserExistCheckType } from "../lib/type";
import { getData } from "./fetch";

export const checkNickNameExists = async (nickName: string): Promise<UserExistCheckType> => {
    try {
        const response = await getData(`${API_URL}/user/check?nickName=${nickName}`);
        return response;
    } catch(error) {
        console.error(error);
        throw error;
    }
}