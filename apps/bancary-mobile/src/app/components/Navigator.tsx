import React, { useState } from "react";
import { AuthProvider } from "../context/AuthContext";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";


//É neste componente que vamos trabalhar toda a aplicação
export function Navigator() {

    const [screen, setScreen] = useState<number>(0);
    
    function changeScreen(screen: number) {

        setScreen(screen);
    }


    function screenController() {

        if(screen == 0) {

            return(
                <LoginPage/>
            )
        }

        if(screen == 1) {

            return(
               <HomePage/>
            )
        }
    }

    return(
        <AuthProvider changeScreen={changeScreen}>
            {screenController()}
        </AuthProvider>
    )
}