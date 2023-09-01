//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { FlagItem, Separator } from '../../Components';
import { Colors, Fonts, CountryCode } from '../../StyleGuide';
import { Display } from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StaticImageService } from '../../services';



const getDropdownStyle = (y) => ({ ...styles.countryDropdown, top: y + 60 })

// create a component
const RegisterPhone = ({ navigation }) => {
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [dropdownLayout, setDropdownLayout] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [inputsContainerY, setInputsContainerY] = useState(0);
    const closeDropdown = (pageX, pageY) => {
        if (isDropdownOpen) {
            if (pageX < dropdownLayout?.x || pageX > dropdownLayout?.x + dropdownLayout?.width ||
                pageY < dropdownLayout?.y || pageY > dropdownLayout?.y + dropdownLayout?.height
            ) {
                setIsDropdownOpen(false);
            }
        }
    }
    const [selectedCountry, setSelectedCountry] = useState(
        CountryCode.find(country => country.name === "India")
    );
    return (
        <View style={styles.container} onStartShouldSetResponder={({ nativeEvent: { pageX, pageY } }) => closeDropdown(pageX, pageY)}>
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
            <Text style={styles.title}>Register Phone</Text>
            <Text style={styles.connect}>Enter your Registered phone number to login</Text>
            <View style={styles.inputsContainer} onLayout={({ nativeEvent: { layout: { y } } }) => setInputsContainerY(y)}>
                <TouchableOpacity style={styles.countryListContainer} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <Image source={{ uri: StaticImageService.getFlagIcon(selectedCountry.code) }} style={styles.flatIcon} />
                    <Text style={styles.countryCodeText}>{selectedCountry.dial_code}</Text>
                    <MaterialIcons name='keyboard-arrow-down' size={18} />
                </TouchableOpacity>
                <View style={styles.phoneInputContainer}>
                    <TextInput
                        placeholder='Phone Number'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        keyboardType="number-pad"
                        style={styles.inputText}
                        onFocus={() => setIsDropdownOpen(false)}
                        onChangeText={(text) => setPhoneNumber(selectedCountry?.dial_code + text)}

                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.SignInButton}
                activeOpacity={0.8}
                onPress={() => { navigation.navigate("Verification", { PhoneNumber }) }
                }>
                <Text style={styles.SignInButtonText}>Continue</Text>
            </TouchableOpacity>
            {isDropdownOpen && (
                <View
                    style={getDropdownStyle(inputsContainerY)}
                    onLayout={({ nativeEvent:
                        { layout: { x, y, height, width } } }) =>
                        setDropdownLayout({ x, y, height, width })
                    }>
                    <FlatList
                        data={CountryCode}
                        keyExtractor={(item) => item.code}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <FlagItem {...item} onPress={(country) => {
                                    setSelectedCountry(country)
                                    setIsDropdownOpen(false)
                                }} />
                            )
                        }}
                    />
                </View>
            )}
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
    inputsContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 50,
    },
    countryListContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        width: Display.setWidth(27),
        marginRight: 10,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: "space-evenly",
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        flexDirection: "row-reverse",
    },
    phoneInputContainer: {
        flex: 1,
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center',
    },
    flatIcon: {
        height: 20,
        width: 20,
    },
    countryCodeText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.Poppins_Medium,
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: "center",
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK,
    },
    countryDropdown: {
        backgroundColor: Colors.LIGHT_GREY,
        position: "absolute",
        width: Display.setWidth(80),
        height: Display.setHeight(50),
        right: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        elevation: 2,
        zIndex: 3,
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

});

//make this component available to the app
export default RegisterPhone;
