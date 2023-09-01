import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts, Images } from '../../StyleGuide';
import { Separator } from '../../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Display } from '../../utils';
import { AuthenticationService } from '../../services';
import LottieView from 'lottie-react-native';



const SignUpScreen = ({ navigation }) => {
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [emailState, setEmailState] = useState("default");
    const [usernameState, setUsernameState] = useState("default");

    const inputStyle = (state) => {
        switch (state) {
            case "valid":
                return { ...styles.inputContainer, borderWidth: 1, borderColor: Colors.SECONDARY_GREEN, }
            case "invalid":
                return { ...styles.inputContainer, borderWidth: 1, borderColor: Colors.SECONDARY_RED, }
            default:
                return styles.inputContainer
        }
    };

    const showMarker = (state) => {
        switch (state) {
            case "valid":
                return (<AntDesign name='checkcircleo' color={Colors.SECONDARY_GREEN} size={18} style={{ marginRight: 5 }} />)
            case "invalid":
                return (<AntDesign name='closecircleo' color={Colors.SECONDARY_RED} size={18} style={{ marginRight: 5 }} />)
            default:
                return null
        }
    }


    const register = () => {
        let user = {
            username,
            email,
            password,
        }
        //console.log(user)
        setIsLoading(true)
        AuthenticationService.register(user).then(response => {
            setIsLoading(false);
            console.log(response)
            if (!response?.status) {
                setErrorMessage(response?.message)
            }
        })
        //navigation.navigate("RegisterPhone")
    };

    const checkUserExist = async (type, value) => {
        if (value?.length > 0) {
            AuthenticationService.checkEmailExist(type, value).then(response => {
                if (response?.status) {
                    type == "email" && emailErrorMessage
                        ? setEmailErrorMessage("")
                        : null;
                    type == "username" && usernameErrorMessage
                        ? setUsernameErrorMessage("")
                        : null;
                    type == "email" ? setEmailState("valid") : null
                    type == "username" ? setUsernameState("valid") : null
                } else {
                    type == "email" ? setEmailErrorMessage(response?.message) : null
                    type == "username"
                        ? setUsernameErrorMessage(response?.message)
                        : null;
                    type == "email" ? setEmailState("invalid") : null
                    type == "username" ? setUsernameState("invalid") : null

                }
            })
        }
    };


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
                <Text style={styles.headerTitle}>Sign Up</Text>
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.connect}>Enter your Email, choose username and password</Text>
            <View style={inputStyle(usernameState)}>
                <View style={styles.inputSubContainer}>
                    <Feather name='user' size={20} color={Colors.DEFAULT_GREY} style={{ marginLeft: 10 }} />
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setUsername(text)}
                        onEndEditing={({ nativeEvent: { text } }) => checkUserExist("username", text)}
                    />
                    {showMarker(usernameState)}
                </View>
            </View>
            <Text style={styles.errorMessage}>{usernameErrorMessage}</Text>
            <View style={inputStyle(emailState)}>
                <View style={styles.inputSubContainer}>
                    <Feather name='mail' size={20} color={Colors.DEFAULT_GREY} style={{ marginLeft: 10 }} />
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setEmail(text)}
                        onEndEditing={({ nativeEvent: { text } }) => checkUserExist("email", text)}
                    />
                    {showMarker(emailState)}
                </View>
            </View>
            <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="lock" size={20} color={Colors.DEFAULT_GREY} style={{ marginLeft: 10 }} />
                    <TextInput
                        secureTextEntry={isPasswordShow ? false : true}
                        placeholder='Password'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Feather
                        name={isPasswordShow ? "eye" : "eye-off"}
                        size={20}
                        color={Colors.DEFAULT_GREY}
                        style={{ marginLeft: 10 }}
                        onPress={() => setPasswordShow(!isPasswordShow)}
                    />
                </View>
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity style={styles.SignInButton} onPress={() => register()}>
                {isLoading ? (
                    <LottieView source={Images.Loading_1} autoPlay />
                ) : (
                    <Text style={styles.SignInButtonText}>Create Account</Text>
                )}
            </TouchableOpacity>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity style={styles.facebookButton}>
                <View style={styles.socialButtonContainer}>
                    <View style={styles.SignInLogoContainer}>
                        <Image source={Images.Facebook} style={styles.SignInLogoButton} />
                    </View>
                    <Text style={styles.SignInButtonText}>Connect with Facebook</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton}>
                <View style={styles.socialButtonContainer}>
                    <View style={styles.SignInLogoContainer}>
                        <Image source={Images.Google} style={styles.SignInLogoButton} />
                    </View>
                    <Text style={styles.SignInButtonText}>Connect with Google</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SignUpScreen

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
    orText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.Poppins_Medium,
        marginRight: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    SignInLogoButton: {
        width: 18,
        height: 18,
    },
    SignInButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Poppins_Medium,
    },
    facebookButton: {
        backgroundColor: Colors.FACEBOOK_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: "center"
    },
    googleButton: {
        backgroundColor: Colors.GOOGLE_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: "center"
    },
    SignInLogoButton: {
        width: 18,
        height: 18,
    },
    SignInLogoContainer: {
        position: "absolute",
        left: 25,
        padding: 2,
        borderRadius: 3,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    socialButtonContainer: {
        flexDirection: "row-reverse",
        alignSelf: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    SignInButtonText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
    },
    ToggleContainer: {
        flexDirection: "row-reverse",
        alignSelf: 'center',
    },
    errorMessage: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        color: Colors.DEFAULT_RED,
        fontFamily: Fonts.Poppins_Medium,
        marginHorizontal: 20,
        marginTop: 5,
    }
})