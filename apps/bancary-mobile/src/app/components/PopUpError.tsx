import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text } from "react-native";

interface IPopUpError {

    message: string;
}

const windowHeight = Dimensions.get('window').height;


export function PopUpError(props: IPopUpError) {

    const translateAnim = useRef(new Animated.Value(-windowHeight)).current;

    useEffect(() => {
        
        Animated.timing(translateAnim, {
            toValue: 0,
            delay: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease
            
        }).start();


        

    }, [])

    setTimeout(function () {
        Animated.timing(translateAnim, {
            toValue: -windowHeight,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease
            
        }).start();
      }.bind(this), 4000);

    return(
        <Animated.View  style={{...styleSheet.container, transform: [{translateX: translateAnim}] }}>
            <Text style={styleSheet.text}>{props.message}</Text>
        </Animated.View>
    )
}

const styleSheet = StyleSheet.create({

    container: {

        position: "absolute",
        top: 15,
        left: 15,
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        zIndex: 5
    },
    text: {

        color: '#721c24',
        fontSize: 14
    }
})