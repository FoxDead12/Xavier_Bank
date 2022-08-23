import { IBankAccount } from "@bancary-account/bancary-interfaces";
import React, { useState } from "react";

export interface IAuthContext {

    name: string,
    email: string,
    bank: IBankAccount,
    token: string;
    singIn: (token: string) => void;
    setData: (name: string, email: string, bank: IBankAccount) => void;
}
 
export const AuthContext= React.createContext<IAuthContext>(null);

interface IAuthProvider {

    children: JSX.Element;
    changeScreen: (screen: number) => void;
}


export function AuthProvider(data: IAuthProvider) {

    const [dataContext, setData] = useState({
        token: "",
        email: "",
        name: "",
        bank: {} as IBankAccount
    });

    async function singIn(token: string){
       
        await setData({...dataContext, token: token});
        data.changeScreen(1);
        
        //Rederecionar para Home
    }

    async function getData(name: string, email: string, bank: IBankAccount) {
        await setData({
            ...dataContext,
            name,
            email,
            bank
        })
    }

    return(
        <AuthContext.Provider value={{token: dataContext.token, email: dataContext.email, name: dataContext.name, bank: dataContext.bank, singIn: singIn, setData: getData}}>
            {data.children}
        </AuthContext.Provider>
    )
}