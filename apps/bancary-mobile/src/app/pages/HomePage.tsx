import { IBankAccount } from "@bancary-account/bancary-interfaces";
import { COLORS } from "@bancary-account/bancary-styles-models";
import { AxiosError } from "axios";
import { GetUserRequest } from "libs/bancary-models/src/lib/apis/GetUserRequest";
import React, { useContext,  useEffect,  useState } from "react";
import { Text, View, Image, StyleSheet, Dimensions, TouchableNativeFeedback } from "react-native";
import { Circle } from "react-native-svg";
import { Deposit } from "../components/Deposit";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { MainStyleSheet } from "../styles/main.styles";

const height= Dimensions.get('window').height;
const width= Dimensions.get('window').width;

export function HomePage() {

    const {token, bank, name, setData} = useContext(AuthContext);
    
    const [isFetching, setFetching] = useState<boolean>(true);
    const [menuDeposit, setMenuDeposit] = useState<boolean>(false);
    
    useEffect(() => {
        //Load All Data User

        loadData()

        async function loadData() {
            
            console.log("LOAD")
            const result = await GetUserRequest(token)

            if(result instanceof AxiosError){

                return;
            }else {

                await setData(result.name, result.email, result.bank as IBankAccount)
            }
            
            
            await setFetching(false)

        }
    }, [])

    
    const onCloseDeposit = () => {

        //CHANGE STATE
        setMenuDeposit(false)
    } 

    if(isFetching) {
        return(
           
            <Loader/>
        )
    }
    else {
        return(
            <View style={{
                flex: 1,
            }}>
                
                {menuDeposit === true ? <Deposit close={onCloseDeposit}/> : <></>}
                
                <View style={{
                    height: height / 3,
                    width: '100%',
                    borderBottomStartRadius : 200,
                    borderBottomEndRadius : 190,
                    backgroundColor: 'transparent',
                    transform: [{scale: 1.5}, ],
                    overflow: 'hidden'
                }}>
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 3,
                        
                    }}>

                        <Text style={{
                            fontSize: 15,
                            fontWeight: '300',
                            color: 'white',
                            zIndex: 3
                        }}>{name}</Text>

                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 31,
                            zIndex: 3
                        }}>{bank.balance}€</Text>

                        <Text style={{
                            
                            color: 'white',
                            fontWeight: '300',
                            fontSize: 20,
                            zIndex: 3,
                        }}>{bank.account_number}</Text>
                    </View>
                    


                    <View style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backgroundColor: COLORS.BACKGROUND_CONTAINER,
                        zIndex: 2
                    }} />

                    <Image style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                        zIndex: 1
                    }} 
                    source={require("../images/wallpaper.jpg")} />
                
                </View>

                <View style={{
                    marginTop: 0,
                    zIndex: 4,
                    backgroundColor: 'transparent',
                    width: '100%',
                    height: 100,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    
                    
                    <View style={{
                        width: 100,
                        height: 100,
                        backgroundColor: COLORS.MAIN,
                        borderRadius: 10,
                        elevation: 10,
                        shadowColor: COLORS.SECOND,
                        marginHorizontal: 10,
                        overflow: 'hidden'
                    }}>
                        <TouchableNativeFeedback onPress={() => setMenuDeposit(true)} background={TouchableNativeFeedback.Ripple('#0000000', true)} style={{zIndex: 4}}>

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                }}>deposit</Text>
                            </View>

                        </TouchableNativeFeedback>
                    </View>

                    <View style={{
                        width: 100,
                        height: 100,
                        backgroundColor: COLORS.MAIN,
                        borderRadius: 10,
                        elevation: 10,
                        shadowColor: COLORS.SECOND,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 10,
                        overflow: 'hidden'
                    }}>
                        <TouchableNativeFeedback onPress={() => console.log("CLICK")} background={TouchableNativeFeedback.Ripple('#0000000', true)} style={{zIndex: 4}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                            <Text style={{
                                fontSize: 16,
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>withdraw</Text>
                            </View>
                        </TouchableNativeFeedback>

                    </View>
                </View>

            </View>
        )
    }
}