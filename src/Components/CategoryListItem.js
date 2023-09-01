//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../StyleGuide';

// create a component
const CategoryListItem = ({ name, isActive, selectedCategory }) => {
    return (
        <View style={styles.container}>
            <Text
                style={isActive ? styles.activeCategoryText : styles.inActiveCategoryText}
                onPress={() => selectedCategory(name)}
            >{name}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.LIGHT_YELLOW,
        paddingHorizontal: 15,
        height: 50,
        justifyContent: 'center',
    },
    activeCategoryText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.DEFAULT_BLACK
    },
    inActiveCategoryText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.Poppins_SemiBold,
        color: Colors.INACTIVE_GREY
    },
});

//make this component available to the app
export default CategoryListItem;
