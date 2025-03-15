import { UserExistCheckType } from "../lib/type";
import { getData } from "./fetch";

export const checkUserExists = async (email: string, nickName: string): Promise<UserExistCheckType> => {
    try {
        const response = await getData(`http://10.0.2.2:5000/user/check?email=${email}&nickName=${nickName}`);
        return response;
    } catch(error) {
        console.error(error);
        throw error;
    }
}