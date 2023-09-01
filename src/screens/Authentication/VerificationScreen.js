import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Separator } from '../../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../../StyleGuide';
import { Display } from '../../utils';

const VerificationScreen = ({ route: { params: { PhoneNumber } } }) => {
    const [otp, setOtp] = useState()
    const firstInput = useRef()
    const secondInput = useRef()
    const thirdInput = useRef()
    const fourthInput = useRef({ 1: "", 2: "", 3: "", 4: "" })
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.HeaderContainer}>
                <Ionicons name='chevron-back-outline' size={30} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>OTP Verification</Text>
            </View>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.connect}>
                Enter the OTP number just send you at{" "}
                <Text style={styles.PhoneNumberText}>{PhoneNumber}</Text>
            </Text>
            <View style={styles.OtpContainer}>
                <View style={styles.OtpBox}>
                    <TextInput
                        style={styles.OtpText}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={firstInput}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 1: text })
                            text && secondInput.current.focus();
                        }}
                    />
                </View>
                <View style={styles.OtpBox}>
                    <TextInput
                        style={styles.OtpText}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={secondInput}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 2: text })
                            text ? thirdInput.current.focus() : firstInput.current.focus()
                        }}
                    />
                </View>
                <View style={styles.OtpBox}>
                    <TextInput
                        style={styles.OtpText}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={thirdInput}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 3: text })
                            text ? fourthInput.current.focus() : secondInput.current.focus()
                        }}
                    />
                </View>
                <View
                    style={styles.OtpBox}>
                    <TextInput
                        style={styles.OtpText}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={fourthInput}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 4: text })
                            !text && thirdInput.current.focus();
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.SignInButton}
                onPress={() => console.log(otp)}
            >
                <Text style={styles.SignInButtonText}>Verify</Text>
            </TouchableOpacity>
        </View>
    )
}

export default VerificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    HeaderContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    headerTitle: {
        width: Display.setWidth(80),
        fontSize: 20,
        fontFamily: Fonts.Poppins_Medium,
        lineHeight: 20 * 1.4,
        textAlign: "center",
        color: Colors.DEFAULT_BLACK
    },
    title: {
        fontSize: 22,
        fontFamily: Fonts.Poppins_Medium,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
        color: Colors.DEFAULT_BLACK
    },
    connect: {
        fontSize: 20,
        fontFamily: Fonts.p,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
        color: Colors.DEFAULT_BLACK
    },
    PhoneNumberText: {
        fontSize: 18,
        fontFamily: Fonts.Poppins_Regular,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_YELLOW
    },
    OtpContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: "space-evenly",
        alignItems: 'center',
        flexDirection: "row-reverse",
    },
    OtpBox: {
        borderRadius: 5,
        borderColor: Colors.DEFAULT_GREEN,
        borderWidth: 0.5,
    },
    OtpText: {
        fontSize: 25,
        color: Colors.DEFAULT_BLACK,
        padding: 0,
        textAlign: "center",
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    SignInButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    SignInButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Poppins_Medium,
    },

})