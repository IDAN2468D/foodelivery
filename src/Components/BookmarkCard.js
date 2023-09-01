//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts } from '../StyleGuide';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StaticImageService } from '../services';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { BookmarkAction } from '../actions';


// create a component
const BookmarkCard = ({ id, name, images, location, tags, navigate }) => {
    const dispatch = useDispatch();
    const removeBookmark = () =>
        dispatch(BookmarkAction.removeBookmark({ restaurantId: id }))

    //console.log(restaurantId);

    return (
        <View style={styles.container}>
            <Ionicons
                name='close-circle'
                color={Colors.DEFAULT_GREY}
                size={32}
                style={styles.removeIcon}
                onPress={() => removeBookmark()}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigate(id)}>
                <Image
                    source={{ uri: StaticImageService.getPoster(images?.poster) }}
                    style={styles.posterStyle}
                />
            </TouchableOpacity>
            <View style={styles.labelContainer}>
                <Text style={styles.titleText}>{name}</Text>
                <View style={styles.rowAndCenter}>
                    <Entypo name='location' size={10} color={Colors.DEFAULT_GREY} />
                    <Text style={styles.locationText}>{location}</Text>
                </View>
                <Text style={styles.tagsText}>{tags?.slice(0, 3).join("▫️")}</Text>
                <View style={styles.buttonLabelRow}>
                    <View style={styles.rowAndCenter}>
                        <FontAwesome name='star' size={13} />
                        <Text style={styles.ratingText}>4.3</Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Ionicons
                            name='ios-time-outline'
                            color={Colors.GOOGLE_BLUE}
                            size={15}
                        />
                        <Text style={styles.ratingText}>10 mins</Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Ionicons
                            name='location-outline'
                            color={Colors.SECONDARY_GREEN}
                            size={15}
                        />
                        <Text style={styles.ratingText}>10 kM</Text>
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
        alignItems: 'center',
    },
    removeIcon: {
        position: "absolute",
        zIndex: 5,
        top: 0,
        right: 0,
    },
    posterStyle: {
        width: 80,
        height: 80,
        borderRadius: 10,
        margin: 5,
    },
    labelContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    tagsText: {
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_BLACK,
        marginBottom: 5,
    },
    rowAndCenter: {
        flexDirection: "row-reverse",
        alignItems: 'center',
    },
    locationText: {
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_BLACK,
        marginBottom: 5,
        marginLeft: 5,
    },
    ratingText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.Poppins_SemiBold,
        color: Colors.DEFAULT_BLACK,
        marginLeft: 5,
    },
    buttonLabelRow: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-between",
    },
});

//make this component available to the app
export default BookmarkCard;
