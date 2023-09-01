//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts, Images } from '../StyleGuide';

// create a component
const CategoryMenuItem = ({ name, logo, activeCategory, setActiveCategory }) => {
    return (
        <TouchableOpacity style={styles.category()} key={name} onPress={() => setActiveCategory(name)}>
            <Image source={Images[logo]} style={styles.categoryIcon(activeCategory === name)} />
            <Text style={styles.categoryText(activeCategory === name)}>{name}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    category: (marginTop = 0) => ({
        alignItems: 'center',
        marginTop
    }),
    categoryText: isActive => ({
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_WHITE,
        marginTop: 5,
        opacity: isActive ? 1 : 0.5,
    }),
    categoryIcon: isActive => ({
        width: 30,
        height: 30,
        opacity: isActive ? 1 : 0.5
    }),

});

//make this component available to the app
export default CategoryMenuItem;
