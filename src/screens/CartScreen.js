//import liraries
import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import Lottie from 'lottie-react-native';
import { Colors, Fonts } from '../StyleGuide';
import { FoodCard, Separator } from '../Components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Display } from '../utils';
import { useSelector } from "react-redux";


// create a component
const CartScreen = ({ navigation }) => {
    const cart = useSelector(state => state?.cartState?.cart);
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>

                <Text style={styles.headerTitle}>My Cart</Text>
            </View>
            {cart?.cartItems?.length > 0 ? (
                <>
                    <ScrollView>
                        <View style={styles.foodList}>
                            {cart?.cartItems?.map(item => (
                                <FoodCard
                                    {...item?.food}
                                    key={item?.food?.id}
                                    navigate={() => navigation.navigate("Food", { foodId: item?.id })}
                                />
                            ))}
                        </View>
                        <View style={styles.promoCodeContainer}>
                            <View style={styles.rowAndCenter}>
                                <Text style={styles.promoCodeText}>And Promo Code</Text>
                                <Entypo name='ticket' size={30} color={Colors.DEFAULT_YELLOW} />
                            </View>
                            <Ionicons name='chevron-forward' size={20} color={Colors.DEFAULT_BLACK} />
                        </View>
                        <View style={styles.amountContainer}>
                            <View style={styles.amountSubContainer}>
                                <Text style={styles.amountLabelText}>Item Total</Text>
                                <Text style={styles.amountText}>$ {cart?.metaData?.itemsTotal?.toFixed(2)}</Text>
                            </View>
                            <View style={styles.amountSubContainer}>
                                <Text style={styles.amountLabelText}>Discount</Text>
                                <Text style={styles.amountText}>$ {cart?.metaData?.discount?.toFixed(2)}</Text>
                            </View>
                            <View style={styles.amountSubContainer}>
                                <Text style={styles.amountLabelText}>Delivery Free</Text>
                                <Text style={{ ...styles.amountLabelText, color: Colors.DEFAULT_GREEN }}>Free</Text>
                            </View>
                        </View>
                        <View style={styles.totalContain}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalText}>$ {cart?.metaData?.grandTotal?.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
                            <View style={styles.rowAndCenter}>
                                <Text style={styles.checkoutText}> ChecKout</Text>
                                <Ionicons name='cart-outline' color={Colors.DEFAULT_WHITE} size={20} />
                            </View>
                            <Text style={styles.checkoutText}>$ {cart?.metaData?.grandTotal?.toFixed(2)}</Text>
                        </TouchableOpacity>
                        <Separator height={Display.setHeight(9)} />
                    </ScrollView>
                </>
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Lottie
                        style={styles.emptyCartImage}
                        source={require("../assets/images/Add to Cart.json")}
                        autoPlay
                        loop
                    />
                    <Text style={styles.emptyCartText}>Cart Empty</Text>
                    <Text style={styles.emptySubText}>Go ahead and order some tasty food</Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Lottie
                            style={styles.emptyCartImage_1}
                            source={require("../assets/images/9446-add-to-cart-shopping.json")}
                            autoPlay
                            loop
                        />
                    </TouchableOpacity>

                </View>
            )}
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
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
        textAlign: "center",
        color: Colors.DEFAULT_BLACK
    },
    foodList: {
        marginHorizontal: Display.setWidth(4),
    },
    promoCodeContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        marginHorizontal: Display.setWidth(4),
        paddingVertical: 15,
        marginTop: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        justifyContent: "space-between",
    },
    promoCodeText: {
        fontSize: 15,
        fontFamily: Fonts.Poppins_Medium,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_BLACK,
        marginRight: 10,
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountContainer: {
        marginHorizontal: Display.setWidth(4),
        paddingVertical: 20,
        borderBottomWidth: 0.5,
    },
    amountSubContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 3,
    },
    amountLabelText: {
        fontSize: 15,
        fontFamily: Fonts.Poppins_Medium,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_GREEN,
    },
    amountText: {
        fontSize: 15,
        fontFamily: Fonts.Poppins_Medium,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_BLACK,
    },
    totalContain: {
        marginHorizontal: Display.setWidth(4),
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
    },
    totalText: {
        fontSize: 20,
        fontFamily: Fonts.Poppins_SemiBold,
        lineHeight: 20 * 1.4,
        color: Colors.DEFAULT_BLACK,
    },
    checkoutButton: {
        flexDirection: "row-reverse",
        width: Display.setWidth(80),
        backgroundColor: Colors.DEFAULT_GREEN,
        alignSelf: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        height: Display.setHeight(7),
        marginTop: 10,
    },
    checkoutText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins_SemiBold,
        lineHeight: 16 * 1.4,
        color: Colors.DEFAULT_WHITE,
        marginRight: 8,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 30,
        fontFamily: Fonts.Poppins_Medium,
        lineHeight: 30 * 1.4,
        color: Colors.DEFAULT_GREEN,
        marginRight: 8,
    },
    emptySubText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins_Light,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
    },
    emptyCartImage: {
        height: Display.setWidth(70),
        width: Display.setWidth(70),
    },
    emptyCartImage_1: {
        height: Display.setWidth(60),
        width: Display.setWidth(60),
    }
});

//make this component available to the app
export default CartScreen;
