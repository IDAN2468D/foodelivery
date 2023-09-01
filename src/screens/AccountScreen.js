//import 
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../StyleGuide';
import { Separator } from '../Components';
import { Display } from '../utils';

// create a component
const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.backgroundCurvedContainer}>

            </View>
            <View style={styles.headerContainer}>

            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundCurvedContainer: {

    },
    headerContainer: {

    }
});

//make this component available to the app
export default AccountScreen;
