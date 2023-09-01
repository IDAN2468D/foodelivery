//import 
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, } from 'react-native';
import { Colors, Images, Fonts } from '../StyleGuide';
import { Display } from '../utils';
import Lottie from 'lottie-react-native';



// create a component
const SplashScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent
            />
            <Lottie source={require("../assets/images/69733-food-beverage.json")} resizeMode="contain" style={styles.image} autoPlay loop />
            <Text style={styles.titleText}>FoodDelivery</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_GREEN,
    },
    image: {
        width: Display.setWidth(60),
        height: Display.setHeight(30),
    },
    titleText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 32,
        fontFamily: Fonts.Poppins_Light,
    }
});

//make this component available to the app
export default SplashScreen;
