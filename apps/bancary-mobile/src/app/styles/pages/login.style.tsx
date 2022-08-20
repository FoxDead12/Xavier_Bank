import React from "react"
import { COLORS } from "@bancary-account/bancary-styles-models"
import { StyleSheet } from "react-native"

export const LoginPageStyleSheet = StyleSheet.create({

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.BACKGROUND,
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        textAlign: 'center',
        marginTop: 50
    },
    button: {

        backgroundColor: COLORS.BACKGROUND,
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    input: {
        width: '90%',
        borderColor: COLORS.BORDER,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 35,
        fontSize: 16,
        fontWeight: 'normal',
        marginVertical: 12,
        color: 'black'
    },
    inputButton: {
        width: '90%',
        padding: 10,
        borderRadius: 35,
        fontSize: 16,
    },
    buttonClose: {

        backgroundColor: 'white',
        padding: 10,
        borderRadius: 100,
        shadowOffset: {width: 2, height: 2},
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 10,
        overflow: 'hidden'
    }
})