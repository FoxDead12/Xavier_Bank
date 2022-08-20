import React from "react";
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import { LoginPage } from "../pages/LoginPage";


//É neste componente que vamos trabalhar toda a aplicação
export function Navigator() {

    return(
        <AuthProvider>
            <LoginPage/>
        </AuthProvider>
    )
}