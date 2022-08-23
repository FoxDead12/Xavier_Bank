import { COLORS } from "@bancary-account/bancary-styles-models";
import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import LottieVeiw  from "lottie-react-native"

export function Loader() {
    

    return (

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '100%',
            maxHeight: '100%'
        }}>

            <View style={{
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 300,
                height: 300,
            }}>

                <LottieVeiw
                    source={require('../animations/loader.json')}
                    autoPlay={true}
                    loop={true}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />

            </View>

        </View>
    )
}