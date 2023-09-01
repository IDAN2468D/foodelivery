import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/CartScreen';
import { AccountScreen, BookmarkScreen, HomeScreen } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Display } from '../utils';
import { Colors } from '../StyleGuide';

const Tab = createBottomTabNavigator();

export default () => {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false,
            tabBarStyle: {
                position: "absolute",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                height: Display.setHeight(8),
                backgroundColor: Colors.DEFAULT_WHITE,
                borderTopWidth: 0,
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: Colors.DEFAULT_GREEN,
            tabBarInactiveTintColor: Colors.INACTIVE_GREY,
        }}
        >
            <Tab.Screen
                name='AccountScreen'
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='person-outline' size={23} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='cart-outline' size={23} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Bookmark"
                component={BookmarkScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='bookmark-outline' size={23} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='home-outline' size={23} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}