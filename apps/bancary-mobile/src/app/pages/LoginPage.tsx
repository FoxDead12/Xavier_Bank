import React, { useContext, useRef, useState } from "react";
import { Text, View, Image, TouchableNativeFeedback, StyleSheet, Animated, Easing, TextInput, Keyboard, AsyncStorage } from "react-native";
import { MainStyleSheet } from "../styles/main.styles";
import { LoginPageStyleSheet } from "../styles/pages/login.style";
import { Dimensions } from 'react-native';
import { XIcon } from "../icons/svgs";
import { PopUpError } from "../components/PopUpError";
import LottieVeiw  from "lottie-react-native"
import { COLORS } from "@bancary-account/bancary-styles-models";
import { AuthContext } from "../context/AuthContext";
import { LoginRequest } from "@bancary-account/bancary-models/apis";

const windowHeight = Dimensions.get('window').height;

export function LoginPage() {

    const {singIn} = useContext(AuthContext);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [play, setPlay] = useState<boolean>(false);

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const transformAnim = useRef(new Animated.Value(windowHeight + windowHeight / 3)).current

    const fadeIn = () => {

        
        Animated.timing(transformAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.linear
            
        }).start();
        
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
            easing: Easing.linear
            
        }).start();
    };

    const closeMenu = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear
            
        }).start();

        Animated.timing(transformAnim, {
            toValue: windowHeight + windowHeight / 3,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.linear
            
        }).start();
    }

    async function onLoginClick() {

        await setError("")
        
        if(email === "" || password === ""){
            
            return setError("Fill in all fields!")
        }

        const request = await LoginRequest(email, password);

        if(typeof request == "string") {

            Keyboard.dismiss();
            setPlay(true);

            setTimeout(async function () {

                singIn(request);
              }.bind(this), 1300);
        }
        else{

            setError(request.message);
        }
        
    }

    return(

        <View style={{...MainStyleSheet.container, justifyContent: 'flex-end'}}>
            
            { error === "" ?  <></> : <PopUpError message={error}/> }

            {play == true ? 

            <View style={{position: 'absolute', flex: 1, width: '100%', height: '100%', backgroundColor: COLORS.BACKGROUND_CONTAINER, zIndex: 4}}>
                <LottieVeiw
                    source={require('../animations/success-tick.json')}
                    autoPlay={true}
                    loop={false}
                    style={{zIndex: 4}}
                /> 
            </View>
            : ''}

            <View style={StyleSheet.absoluteFill}>
                <Text style={LoginPageStyleSheet.title}>Welcome to XAVIER BANK </Text>
                <Image style={{width: '100%', height: '100%', zIndex: 0}}  source={require("../images/wallpaper.jpg")} />
            </View>

            <View style={{height: windowHeight / 6}}>
                
                <TouchableNativeFeedback onPress={() => fadeIn()}>
                    <Animated.View style={{...LoginPageStyleSheet.button, opacity: fadeAnim, zIndex: 1}}>
                        <Text style={LoginPageStyleSheet.buttonText}>SIGN IN</Text>
                    </Animated.View>
                </TouchableNativeFeedback>
            </View>

            <Animated.View style={{height: windowHeight / 3, width: '100%', backgroundColor: 'transparent', position: 'absolute', transform: [{translateY: transformAnim}], zIndex: 2}}>
    
                <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                    <View style={{position: 'absolute', top: -25, width: '100%', height: 35, backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center'}}>                                            
                        <View style={LoginPageStyleSheet.buttonClose}>
                            <TouchableNativeFeedback onPress={closeMenu} background={TouchableNativeFeedback.Ripple('#0000000', true)} style={{zIndex: 4}}>
                                <View>
                                    <XIcon/>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>


                    <TextInput

                        style={{...LoginPageStyleSheet.input}}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        keyboardType={"email-address"}
                        placeholderTextColor={"black"}
                        />

                    <TextInput

                        style={{...LoginPageStyleSheet.input}}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        keyboardType={"default"}
                        placeholderTextColor={"black"}
                        secureTextEntry={true}
                    />

                    <TouchableNativeFeedback onPress={onLoginClick} >
                        <View style={{...LoginPageStyleSheet.inputButton}}>
                            <Text style={[LoginPageStyleSheet.buttonText, {textAlign: 'center'}]}>SIGN IN</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </Animated.View>

        </View>
    )

}

