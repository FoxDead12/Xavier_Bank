import axios, { AxiosError } from "axios";
import { baseUrl, urlApi } from "./variavels";

export async function LoginRequest(email: string, password: string): Promise<string | AxiosError > {

    const result = await axios.post(
        `${baseUrl}${urlApi}/users/auth`, 
        JSON.stringify({email, password}), 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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