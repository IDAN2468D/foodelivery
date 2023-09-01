//import 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Mock } from '../StyleGuide';
import { CategoryMenuItem, FlagItem, RestaurantCard, RestaurantMediumCard, Separator } from '../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { RestaurantService } from '../services';
import { Display } from '../utils';

const sortStyle = isActive => isActive ? styles.sortListItem : { ...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE }


// create a component
const HomeScreen = ({ navigation }) => {
    const [activeCategory, setActiveCategory] = useState();
    const [restaurant, setRestaurant] = useState(null);
    const [activeSortItem, setActiveSortItem] = useState("recent");

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            RestaurantService.getRestaurants().then(response => {
                if (response?.status) {
                    setRestaurant(response?.data);
                }
            });
        });
        return unsubscribe;
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent />
            <Separator height={Display.setHeight(5)} />
            <View style={styles.backgroundColorCurvedContainer} />
            <View style={styles.headerContainer}>
                <View style={styles.locationContainer}>
                    <Ionicons name='location-outline' size={15} Color={Colors.DEFAULT_WHITE} />
                    <Text style={styles.locationText}>Delivery to</Text>
                    <Text style={styles.selectedLocationText}>HOME</Text>
                    <MaterialIcons name='keyboard-arrow-down' size={16} color={Colors.DEFAULT_YELLOW} />
                    <Feather
                        name='bell'
                        size={24}
                        color={Colors.DEFAULT_WHITE}
                        style={{ position: "absolute", right: 0 }}
                        onPress={() => navigation.navigate("Notification")}
                    />
                    <View style={styles.alertBadge}>
                        <Text style={styles.alertBadgeText}>12</Text>
                    </View>
                </View>
                <View style={styles.searchContainer}>
                    <View style={styles.searchSection}>
                        <Ionicons name='search-outline' size={25} color={Colors.DEFAULT_GREY} />
                        <Text style={styles.searchText}>Search...</Text>
                    </View>
                    <Feather name='sliders' size={20} color={Colors.DEFAULT_YELLOW} style={{ marginLeft: 10, }} />
                </View>
                <View style={styles.categoriesContainer}>
                    {Mock.CATEGORIES.map(({ name, logo }) => (
                        <CategoryMenuItem
                            name={name}
                            key={name}
                            logo={logo}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    ))}
                </View>
            </View>
            <ScrollView style={styles.listContainer}>
                <View style={styles.horizontalListContainer}>
                    <View style={styles.listHeader}>
                        <Text style={styles.listHeaderTitle}>Top Rated</Text>
                        <Text style={styles.listHeaderSubTitle}>See All</Text>
                    </View>
                    <FlatList
                        data={restaurant}
                        keyExtractor={item => item?.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={() => <Separator width={20} />}
                        ListFooterComponent={() => <Separator width={20} />} ד
                        ItemSeparatorComponent={() => <Separator width={10} />}
                        renderItem={({ item }) => (
                            <RestaurantCard
                                {...item}
                                navigate={(restaurantId) =>
                                    navigation.navigate("Restaurant", { restaurantId })}
                            />
                        )}
                    />
                </View>
                <View style={styles.sortListContainer}>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === "recent")}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem("recent")}
                    >
                        <Text style={styles.sortListItemText}>recent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === "favorite")}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem("favorite")}
                    >
                        <Text style={styles.sortListItemText}>Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === "rating")}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem("rating")}
                    >
                        <Text style={styles.sortListItemText}>Rating</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === "popular")}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem("popular")}
                    >
                        <Text style={styles.sortListItemText}>Popular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === "trending")}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem("trending")}
                    >
                        <Text style={styles.sortListItemText}>Trending</Text>
                    </TouchableOpacity>
                </View>
                {restaurant?.map(item => (
                    <RestaurantMediumCard {...item} key={item?.id} />
                ))}
                <Separator height={Display.setHeight(10)} />
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        justifyContent: "space-evenly"
    },
    backgroundColorCurvedContainer: {
        backgroundColor: Colors.DEFAULT_GREEN,
        height: 2000,
        position: "absolute",
        top: -1 * (2000 - 230),
        width: 2000,
        borderRadius: 2000,
        alignSelf: "center",
        zIndex: -1,
    },
    locationContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20,
    },
    locationText: {
        color: Colors.DEFAULT_WHITE,
        marginRight: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
    },
    selectedLocationText: {
        color: Colors.DEFAULT_YELLOW,
        marginRight: 5,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
    },
    alertBadge: {
        borderRadius: 32,
        backgroundColor: Colors.DEFAULT_YELLOW,
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 16,
        position: "absolute",
        right: -2,
        top: -10,
    },
    alertBadgeText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.Poppins_Bold,
    },
    searchContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        height: 45,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    searchSection: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        marginLeft: 10,
    },
    searchText: {
        color: Colors.DEFAULT_GREY,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        marginRight: 10,
    },
    categoriesContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        marginTop: 20,
    },
    listContainer: {
        paddingVertical: 5,
        zIndex: -5,
    },
    horizontalListContainer: {
        marginTop: 30,
    },
    listHeader: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginBottom: 5,
    },
    listHeaderTitle: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
    },
    listHeaderSubTitle: {
        color: Colors.DEFAULT_YELLOW,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
    },
    sortListContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        backgroundColor: Colors.DEFAULT_WHITE,
        alignItems: 'center',
        marginTop: 8,
        elevation: 1
    },
    sortListItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.DEFAULT_YELLOW,
        height: 40,
    },
    sortListItemText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.Poppins_SemiBold,
    },
});

//make this component available to the app
export default HomeScreen;
