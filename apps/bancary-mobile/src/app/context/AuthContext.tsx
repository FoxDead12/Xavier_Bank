import { IUser } from "@bancary-account/bancary-interfaces";
import React from "react";


export const AuthContext= React.createContext({});

interface IAuthProvider {
    children: JSX.Element;
}

export function AuthProvider(data: IAuthProvider) {

    return(
        <AuthContext.Provider value={{} as IUser}>
            {data.children}
        </AuthContext.Provider>
    )
}