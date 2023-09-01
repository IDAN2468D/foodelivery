//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Images } from '../StyleGuide';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Display } from '../utils';
import { StaticImageService } from '../services';


// create a component
const RestaurantMediumCard = ({ name, images: { logo }, time, distance, tags }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View>
                <Image source={{ uri: StaticImageService.getLogo(logo) }} resizeMode="cover" style={styles.posterStyle} />
            </View>
            <View style={styles.labelContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{name}</Text>
                    <View style={styles.rowAndCenter}>
                        <FontAwesome />
                        <Text style={styles.ratingText}>4.2</Text>
                        <Text style={styles.reviewsText}>({233})</Text>
                    </View>
                </View>
                <Text style={styles.tagsText}>{tags?.join("▫️")}</Text>
                <View style={styles.deliveryDetailsContainer}>
                    <View style={styles.rowAndCenter}>
                        <Image source={Images.Delivery_charge} style={styles.deliveryDetailsIcon} />
                        <Text style={styles.deliveryDetailsText}>Free Delivery</Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Image source={Images.Delivery_time} style={styles.deliveryDetailsIcon} />
                        <Text style={styles.deliveryDetailsText}>{time} min</Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Text style={styles.deliveryDetailsText}>{distance}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        elevation: 1,
        marginHorizontal: 15,
        borderRadius: 8,
        backgroundColor: Colors.DEFAULT_WHITE,
        marginTop: 8,
    },
    posterStyle: {
        width: Display.setWidth(20),
        height: Display.setWidth(20),
        borderRadius: 10,
        margin: 5,
    },
    labelContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    titleContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    deliveryDetailsContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    titleText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.DEFAULT_BLACK,
        marginBottom: 5,
    },
    tagsText: {
        fontSize: 12,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_GREY,
        marginBottom: 7,
    },
    deliveryDetailsText: {
        marginRight: 3,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.DEFAULT_BLACK,
    },
    deliveryDetailsIcon: {
        height: 16,
        width: 16,
    },
    rowAndCenter: {
        flexDirection: "row-reverse",
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 3,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.DEFAULT_BLACK,
    },
    reviewsText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_BLACK,
    }

});

//make this component available to the app
export default RestaurantMediumCard;