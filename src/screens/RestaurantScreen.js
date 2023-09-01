//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, FlatList } from 'react-native';
import { RestaurantService, StaticImageService } from '../services';
import { Display } from '../utils';
import { ApiConstants, Colors, Fonts, Images } from '../StyleGuide';
import { CategoryListItem, FoodCard, Separator } from '../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { BookmarkAction } from '../actions';

function ListHeader() {
    return (
        <View
            style={{
                flexDirection: "row-reverse",
                flex: 1,
                width: 40,
                borderTopLeftRadius: 64,
                borderBottomLeftRadius: 64,
            }}
        >
            <View
                style={{
                    backgroundColor: Colors.LIGHT_YELLOW,
                    width: 20,
                    borderTopLeftRadius: 64,
                    borderBottomLeftRadius: 64
                }}
            />
        </View>
    )
}

function ListFooter() {
    return (
        <View
            style={{
                flexDirection: "row",
                flex: 1,
                width: 40,
            }}
        >
            <View
                style={{
                    backgroundColor: Colors.LIGHT_YELLOW,
                    width: 20,
                    borderTopRightRadius: 64,
                    borderBottomRightRadius: 64
                }}
            />
        </View>
    )
}


// create a component
const RestaurantScreen = ({ navigation, route: { params: { restaurantId } } }) => {
    const [restaurant, setRestaurant] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    //const [active, setActive] = useState();

    useEffect(() => {
        RestaurantService.getOneRestaurantById(restaurantId).then(response => {
            setSelectedCategory(restaurant?.data?.categories[0]);
            setRestaurant(response?.data);
        })
    }, [])

    const dispatch = useDispatch();

    const isBookmarked = useSelector(
        state =>
            state?.bookmarkState?.bookmarks?.filter(
                item => item?.restaurantId === restaurantId,
            )?.length > 0,
    );

    const addBookmark = () =>
        dispatch(BookmarkAction.addBookmark({ restaurantId }));

    const removeBookmark = () =>
        dispatch(BookmarkAction.removeBookmark({ restaurantId }))

    //console.log(restaurantId);
    //console.log(isBookmarked)

    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" translucent backgroundColor="transparent" />
            <>
                <Image
                    source={{
                        uri: StaticImageService.getGalleryImage(
                            restaurant?.images?.cover,
                            ApiConstants.STATIC_IMAGE.SIZE.SQUARE)
                    }}
                    style={styles.backgroundImage}
                />
                <ScrollView>
                    <Separator height={Display.setHeight(35)} />
                    <View style={styles.mainContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{restaurant?.name}</Text>
                            <Ionicons
                                name={isBookmarked ? 'bookmark' : "bookmark-outline"}
                                color={Colors.DEFAULT_YELLOW}
                                size={25}
                                onPress={() => isBookmarked ? removeBookmark() : addBookmark()}
                            />
                        </View>
                        <Text style={styles.tagText}>{restaurant?.tags?.join("▫️")}</Text>
                        <View style={styles.ratingReviewsContainer}>
                            <FontAwesome name='star' size={18} color={Colors.DEFAULT_YELLOW} />
                            <Text style={styles.ratingText}>4.2</Text>
                            <Text style={styles.reviewsText}>(455 Reviews)</Text>
                        </View>
                        <View style={styles.deliveryDetailsContainer}>
                            <View style={styles.rowAndCenter}>
                                <Image source={Images.Delivery_charge} style={styles.deliveryDetailIcon} />
                                <Text style={styles.deliveryDetailText}>Free Delivery</Text>
                            </View>
                            <View style={styles.rowAndCenter}>
                                <Image source={Images.Delivery_time} style={styles.deliveryDetailIcon} />
                                <Text style={styles.deliveryDetailText}>{restaurant?.time} min</Text>
                            </View>
                            <View>
                                <View style={styles.rowAndCenter}>
                                    <Image source={Images.Marker} style={styles.deliveryDetailIcon} />
                                    <Text style={styles.deliveryDetailText}>{restaurant?.distance / 1000} km</Text>
                                </View>
                            </View>
                            <View style={styles.restaurantType}>
                                <Text style={styles.restaurantTypeText}>{restaurant?.type}</Text>
                            </View>
                        </View>
                        <View style={styles.categoriesContainer}>
                            <FlatList
                                data={restaurant?.categories}
                                keyExtractor={item => item}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ListHeaderComponent={() => <ListHeader />}
                                ListFooterComponent={() => <ListFooter />}
                                renderItem={({ item }) =>
                                    <CategoryListItem
                                        name={item}
                                        isActive={item === selectedCategory}
                                        selectedCategory={(category) => setSelectedCategory(category)}
                                    />
                                }
                            />
                        </View>
                        <View style={styles.foodList}>
                            {restaurant?.foods
                                ?.filter(food => food?.category === selectedCategory)
                                ?.map(item => (
                                    <FoodCard
                                        key={item?.id}
                                        {...item}
                                        navigate={() => navigation.navigate("Food", { foodId: item?.id })} />
                                ))}
                            <Separator height={Display.setHeight(2)} />
                        </View>
                    </View>
                </ScrollView>
            </>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImage: {
        position: "absolute",
        top: 0,
        height: Display.setWidth(100),
        width: Display.setWidth(100),
    },
    mainContainer: {
        backgroundColor: Colors.SECONDARY_WHITE,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    titleContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-between",
        marginHorizontal: 25,
        marginTop: 15,
    },
    title: {
        fontSize: 23,
        lineHeight: 23 * 1.4,
        fontFamily: Fonts.Poppins_SemiBold,
        color: Colors.DEFAULT_BLACK,
    },
    tagText: {
        marginHorizontal: 25,
        marginTop: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.Poppins_SemiBold,
        color: Colors.DEFAULT_GREY
    },
    ratingReviewsContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 10,
    },
    ratingText: {
        marginRight: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.DEFAULT_BLACK,
    },
    reviewsText: {
        marginRight: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_BLACK,
    },
    deliveryDetailsContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 10,
        justifyContent: "space-between",
    },
    deliveryDetailText: {
        marginRight: 3,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_BLACK,
    },
    deliveryDetailIcon: {
        height: 16,
        width: 16,
    },
    rowAndCenter: {
        flexDirection: "row-reverse",
        alignItems: 'center',
    },
    restaurantType: {
        backgroundColor: Colors.LIGHT_YELLOW,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
    },
    restaurantTypeText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_YELLOW,
    },
    categoriesContainer: {
        marginVertical: 20,
    },
    foodList: {
        marginHorizontal: 15,
    }
});

//make this component available to the app
export default RestaurantScreen;
