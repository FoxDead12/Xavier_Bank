import { COLORS } from "@bancary-account/bancary-styles-models";
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableNativeFeedbackBase, TouchableNativeFeedback } from "react-native";
import { XIcon } from "../icons/svgs";


interface IDeposit {

    close: () => void;
}


export function Deposit(props: IDeposit) {
    
    const [bankAccount, setBankAccount] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    return(
        <View style={styles.bk}>
            <View style={styles.container}>
                <Text>Deposit</Text>
                
                <View style={{
                    position: 'absolute',
                    right: 10,
                    top: 10
                }}>
                    <TouchableNativeFeedback onPress={props.close}>
                        <View>
                            <XIcon/>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <TextInput

                    style={styles.input}
                    placeholder="Bank Account to send"
                    onChangeText={(text) => setBankAccount(text)}
                    value={bankAccount}
                    keyboardType={"default"}
                    placeholderTextColor={"black"}
                />

                <TextInput

                    style={styles.input}
                    placeholder="Amount"
                    onChangeText={(text) => setAmount(Number(text))}
                    value={amount != 0 ? amount.toString() : ""}
                    keyboardType={"number-pad"}
                    placeholderTextColor={"black"}
                    
                />
                
                <TouchableNativeFeedback>
                    <View style={styles.button}>
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            textAlign: 'center'
                        }}>Deposit</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    bk: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.BACKGROUND_CONTAINER,
        zIndex: 10,  
        justifyContent: 'center',
        alignItems: 'center' 
    },
    container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: 'white',
        width: '90%'
    },
    input: {

        borderBottomWidth: 1,
        marginVertical: 10,
    },
    button: {

        width: '100%',
        backgroundColor: COLORS.MAIN,
        padding: 10,
        borderRadius: 5,
        elevation: 10,
        shadowColor: COLORS.SECOND
    }
})