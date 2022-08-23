import axios, { AxiosError } from "axios";
import { GetUserView } from "../views";
import { baseUrl, urlApi } from "./variavels";

export async function GetUserRequest(token: string): Promise<GetUserView | AxiosError > {

    const result = await axios.post(
        `${baseUrl}${urlApi}/users/get`, {} ,
        {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Cookie" : "token=" + token + ";"
            }
        }
    )
    .then((response) => {

        return response.data;
    })
    .catch((error) => {

        return error.response.data;
    })

    
    return result;
}