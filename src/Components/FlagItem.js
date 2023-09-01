//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts } from '../StyleGuide';
import { StaticImageService } from '../services';

// create a component
const FlagItem = ({ name, code, dial_code, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress({ code, name, dial_code })}>
            <Image source={{ uri: StaticImageService.getFlagIcon(code) }} style={styles.flagImage} />
            <Text style={styles.flagText}>{name}</Text>
            <Text style={styles.flagText}>{dial_code}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    flagImage: {
        height: 25,
        width: 25,
        marginLeft: 10
    },
    flagText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.Poppins_Medium,
        marginLeft: 10,
    }
});

//make this component available to the app
export default FlagItem;
