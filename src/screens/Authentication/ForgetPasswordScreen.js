import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../StyleGuide';
import { Separator } from '../../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Display } from '../../utils';


const ForgetPasswordScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.HeaderContainer}>
                <Ionicons name='chevron-back-outline' size={30} color={Colors.DEFAULT_BLACK} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Forget Password</Text>
            </View>
            <Text style={styles.title}>Forget Password</Text>
            <Text style={styles.connect}>Enter your Email, so that we can help you to you password</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name='mail' size={20} color={Colors.DEFAULT_GREY} style={{ marginLeft: 10 }} />
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.SignInButton}>
                <Text style={styles.SignInButtonText}>Reset Password</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ForgetPasswordScreen

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
        fontFamily: Fonts.Poppins_Medium,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
        color: Colors.DEFAULT_BLACK
    },
    inputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center',
    },
    inputSubContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
    },
    inputText: {
        flex: 1,
        fontSize: 14,
        textAlignVertical: "center",
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK
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