import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Display } from '../utils';
import { Colors, Fonts, Images } from '../StyleGuide';

const WelcomeCard = ({ title, content, image }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={Images[image]} resizeMode="contain" />
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.contentText}>{content}</Text>
        </View>
    )
}

export default WelcomeCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Display.setWidth(100),
    },
    image: {
        height: Display.setHeight(30),
        width: Display.setWidth(60)
    },
    textTitle: {
        fontSize: 22,
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.DEFAULT_BLACK,
    },
    contentText: {
        fontSize: 18,
        fontFamily: Fonts.Poppins_Light,
        color: Colors.DEFAULT_BLACK,
        textAlign: "center",
        marginHorizontal: 20,
    }
})