import { API_URL } from "@env";
import { UserExistCheckType } from "../lib/type";
import { getData } from "./fetch";

export const checkUserExists = async (email: string, nickName: string): Promise<UserExistCheckType> => {
    try {
        const response = await getData(`${API_URL}/user/check?email=${email}&nickName=${nickName}`);
        return response;
    } catch(error) {
        console.error(error);
        throw error;
    }
}