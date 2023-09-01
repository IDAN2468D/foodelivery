//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { Colors, Fonts } from '../StyleGuide';
import { BookmarkCard, Separator } from '../Components';
import { useSelector } from 'react-redux';

const ListItemSeparator = () => { <View style={{ height: 0.5, backgroundColor: Colors.DEFAULT_GREY, }} /> }

// create a component
const BookmarkScreen = ({ navigation }) => {
    const bookmarks = useSelector(state => state?.bookmarkState?.bookmarks);
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Bookmarks</Text>
            </View>
            <FlatList
                data={bookmarks}
                style={styles.BookmarkList}
                keyExtractor={item => item?.restaurantId}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Separator height={10} />}
                ListFooterComponent={() => <Separator height={10} />}
                ItemSeparatorComponent={() => <ListItemSeparator />}
                renderItem={({ item }) => (
                    <BookmarkCard
                        {...item?.restaurant}
                        navigate={(restaurantId) =>
                            navigation.navigate("Restaurant", { restaurantId })
                        }
                    />
                )
                }
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.DEFAULT_BLACK,
        lineHeight: 20 * 1.4,
    },
    BookmarkList: {
        marginHorizontal: 20,
    }
});

//make this component available to the app
export default BookmarkScreen;
