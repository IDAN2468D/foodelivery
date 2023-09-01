//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { ApiConstants, Colors, Fonts } from '../StyleGuide';
import { Display } from '../utils';
import { StaticImageService } from '../services';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CartAction } from '../actions';


// create a component
const FoodCard = ({ id, name, description, price, image, navigate }) => {
    const dispatch = useDispatch();
    const itemCount = useSelector(state => state?.cartState?.cart?.cartItems?.find(item => item?.foodId === id)?.count);

    const addToCart = foodId => dispatch(CartAction.addToCart({ foodId }));

    const removeFromCart = foodId =>
        dispatch(CartAction.removeFromCart({ foodId }))

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
                <Image source={{
                    uri: StaticImageService.getGalleryImage(
                        image,
                        ApiConstants.STATIC_IMAGE.SIZE.SQUARE
                    )
                }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
                <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
                    <Text numberOfLines={1} style={styles.titleText}>{name}</Text>
                    <Text numberOfLines={2} style={styles.descriptionText}>{description}</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.priceText}>${price}</Text>
                    <View style={styles.itemAddContainer}>
                        {itemCount > 0 ? (
                            <AntDesign
                                name='minus'
                                color={Colors.DEFAULT_YELLOW}
                                size={18}
                                onPress={() => removeFromCart(id)}
                            />
                        ) : null}
                        {itemCount > 0 ? (
                            <Text style={styles.itemCountText}>{itemCount}</Text>
                        ) : null}
                        <AntDesign
                            name='plus'
                            color={Colors.DEFAULT_YELLOW}
                            size={18}
                            onPress={() => addToCart(id)}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row-reverse",
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 2,
        backgroundColor: Colors.LIGHT_GREY,
    },
    image: {
        width: 100,
        height: 100,
        margin: 6,
        borderRadius: 8,
    },
    detailsContainer: {
        marginHorizontal: 5,
    },
    titleText: {
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.Poppins_Bold,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        marginBottom: 8,
    },
    descriptionText: {
        width: Display.setWidth(60),
        color: Colors.DEFAULT_GREY,
        fontFamily: Fonts.Poppins_SemiBold,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        marginBottom: 8,
    },
    priceText: {
        color: Colors.DEFAULT_YELLOW,
        fontFamily: Fonts.Poppins_Bold,
        fontSize: 14,
        lineHeight: 14 * 1.4,
    },
    footerContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 5,
    },
    itemAddContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GREY2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    itemCountText: {
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.Poppins_Medium,
        fontSize: 11,
        lineHeight: 11 * 1.4,
        marginHorizontal: 8,
    }

});

//make this component available to the app
export default FoodCard;
