import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import { Separator, ToggleButton } from '../../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors, Fonts, Images } from '../../StyleGuide';
import { Display } from '../../utils';
import { AuthenticationService, StorageService } from '../../services';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { GeneralAction } from '../../actions';

// create a component
const SignInScreen = ({ navigation }) => {
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch()

    const signIn = async () => {
        setIsLoading(true);
        let user = {
            username,
            password,
        };
        AuthenticationService.login(user).then(response => {
            setIsLoading(false);
            //console.log(response?.data)
            if (response?.status) {
                StorageService.setToken(response?.data).then(() => {
                    dispatch(GeneralAction.setToken(response?.data))
                })
            } else {
                setErrorMessage(response?.message)
            }
        });
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
                <Text style={styles.headerTitle}>Sign In</Text>
            </View>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.connect}>Enter your username and password, and enjoy ordering food</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name='user' size={20} color={Colors.DEFAULT_GREY} style={{ marginLeft: 10 }} />
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
            </View>
            <Separator height={15} />
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
            <View style={styles.forgetPasswordContainer}>
                <View style={styles.ToggleContainer}>
                    <ToggleButton size={0.5} />
                    <Text style={styles.RememberMeText}>Remember Me</Text>
                </View>
                <Text
                    style={styles.forgetPasswordText}
                    onPress={() => navigation.navigate("ForgetPassword")}>Forget Password</Text>
            </View>
            <TouchableOpacity style={styles.SignInButton} activeOpacity={0.8} onPress={() => signIn()}>
                {isLoading ? (
                    <LottieView source={Images.Loading_1} autoPlay />
                ) : (
                    <Text style={styles.SignInButtonText}>Sign In</Text>
                )}

            </TouchableOpacity>
            <View style={styles.signUpContainer}>
                <Text>Don't have an account?</Text>
                <Text
                    style={styles.signUpText}
                    onPress={() => navigation.navigate("SignUpScreen")}
                >SignUp</Text>
            </View>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity style={styles.facebookButton}>
                <View style={styles.socialButtonContainer}>
                    <View style={styles.SignInLogoContainer}>
                        <Image source={Images.Facebook} style={styles.SignInLogoButton} />
                    </View>
                    <Text style={styles.signInButtonText}>Connect with Facebook</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton}>
                <View style={styles.socialButtonContainer}>
                    <View style={styles.SignInLogoContainer}>
                        <Image source={Images.Google} style={styles.SignInLogoButton} />
                    </View>
                    <Text style={styles.signInButtonText}>Connect with Google</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
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
        textAlign: "center"
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
    forgetPasswordContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    RememberMeText: {
        marginRight: 10,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: Colors.DEFAULT_GREY,
        fontFamily: Fonts.Poppins_Medium,
    },
    forgetPasswordText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.Poppins_Bold,
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
    signUpContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingVertical: 20,
        flexDirection: "row-reverse",
    },
    accountText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.Poppins_Medium,
    },
    signUpText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.Poppins_Medium,
        marginRight: 5,
    },
    orText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.Poppins_Medium,
        marginRight: 5,
        alignSelf: 'center',
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
    signInButtonText: {
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
});

//make this component available to the app
export default SignInScreen;
