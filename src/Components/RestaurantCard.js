import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../StyleGuide';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StaticImageService } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { BookmarkAction } from '../actions';


const RestaurantCard = ({ id, name, images: { poster }, tags, distance, time, onPress, navigate }) => {
    const dispatch = useDispatch();
    const isBookmarked = useSelector(
        state =>
            state?.bookmarkState?.bookmarks?.filter(
                item => item?.restaurantId === id,
            )?.length > 0,
    );

    const addBookmark = () =>
        dispatch(BookmarkAction.addBookmark({ restaurantId: id }));

    const removeBookmark = () =>
        dispatch(BookmarkAction.removeBookmark({ restaurantId: id }))

    //console.log(restaurantId);
    //console.log(isBookmarked)

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => navigate(id)}>
            <Ionicons
                name={isBookmarked ? 'bookmark' : "bookmark-outline"}
                color={Colors.DEFAULT_YELLOW}
                size={25}
                style={styles.bookmarks}
                onPress={() => isBookmarked ? removeBookmark() : addBookmark()}
            />
            <Image source={{ uri: StaticImageService.getPoster(poster) }} resizeMode="cover" style={styles.posterStyle} />
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.tagText}>{tags?.join("▫️")}</Text>
            <View style={styles.footerContainer}>
                <View style={styles.rowAndCenter}>
                    <Text style={styles.ratingText}>4</Text>
                    <Text style={styles.reviewText}>({10})</Text>
                    <FontAwesome name='star' size={14} color={Colors.DEFAULT_YELLOW} />
                </View>
                <View style={styles.rowAndCenter}>
                    <View style={styles.timeAndDistanceContainer}>
                        <Ionicons name='location-outline' color={Colors.DEFAULT_YELLOW} size={15} />
                        <Text style={styles.timeAndDistanceText}>{distance}</Text>
                    </View>
                    <View style={styles.timeAndDistanceContainer}>
                        <Ionicons name='time-outline' color={Colors.DEFAULT_YELLOW} size={15} />
                        <Text style={styles.timeAndDistanceText}>{time}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 5,
    },
    posterStyle: {
        width: 1920 * 0.15,
        height: 1080 * 0.15,
        borderRadius: 10,
        margin: 5,
    },
    titleText: {
        marginRight: 8,
        fontSize: 15,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_BLACK,
    },
    tagText: {
        marginRight: 8,
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_GREY,
        marginBottom: 5,
    },
    footerContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 6,
        justifyContent: "space-between",
    },
    rowAndCenter: {
        flexDirection: "row",
        alignItems: 'center',
    },
    timeAndDistanceContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: Colors.LIGHT_YELLOW,
        borderRadius: 12,
        marginHorizontal: 3,
    },
    timeAndDistanceText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.DEFAULT_YELLOW
    },
    ratingText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.DEFAULT_BLACK
    },
    reviewText: {
        marginRight: 5,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.DEFAULT_BLACK
    },
    bookmarks: {
        position: "absolute",
        top: 20,
        left: 10,
        zIndex: 10,
    }
})