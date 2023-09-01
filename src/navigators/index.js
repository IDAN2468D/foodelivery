import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    SplashScreen,
    WelcomeScreen,
    SignInScreen,
    SignUpScreen,
    ForgetPasswordScreen,
    RegisterPhone,
    VerificationScreen,
    RestaurantScreen,
    FoodScreen,
    Notification,
} from '../screens';
import HomeTabs from './ButtonTubs';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralAction } from '../actions';

const Stack = createStackNavigator();

const Navigators = () => {

    const { isAppLoading, token, isFirstTimeUse } = useSelector(
        state => state?.generalState,
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GeneralAction.appStart())
    }, [])


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAppLoading ? (
                    <Stack.Screen name='Splash' component={SplashScreen} />
                ) : !token ? (
                    <>
                        {isFirstTimeUse && (
                            <Stack.Screen name='Welcome' component={WelcomeScreen} />
                        )}
                        <Stack.Screen name='SignInScreen' component={SignInScreen} />
                        <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                        <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen} />
                        <Stack.Screen name='RegisterPhone' component={RegisterPhone} />
                        <Stack.Screen name='Verification' component={VerificationScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name='HomeTabs' component={HomeTabs} />
                        <Stack.Screen name='Restaurant' component={RestaurantScreen} />
                        <Stack.Screen name='Food' component={FoodScreen} />
                        <Stack.Screen name='Notification' component={Notification} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Navigators;
