//import 
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Fonts, General } from '../StyleGuide';
import { WelcomeCard, Separator } from '../Components';
import { Display } from '../utils';
import { StorageService } from '../services';
import { useDispatch } from 'react-redux';
import { GeneralAction } from '../actions';

const pageStyle = isActive =>
    isActive ? styles.page : { ...styles.page, backgroundColor: Colors.DEFAULT_GREY };

function Pagination({ index }) {
    return (
        <View style={styles.ContainerPages}>
            {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
                i === index ? (
                    <View style={pageStyle(true)} key={i} />
                ) : (
                    <View style={pageStyle(false)} key={i} />
                ),
            )}
        </View>
    )
}

// create a component
const WelcomeScreen = ({ navigation }) => {
    const [welcomeListIndex, setWelcomeListIndex] = useState(0);
    const welcomeList = useRef();
    const onViewRef = useRef(({ changed }) => {
        setWelcomeListIndex(changed[0].index);
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const pageScroll = () => {
        welcomeList.current.scrollToIndex({
            index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
        })
    }

    const dispatch = useDispatch();

    const navigate = () => {
        StorageService.setFirstTimeUse().then(() => {
            dispatch(GeneralAction.setIsFirstTimeUse());
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
            <Separator height={Display.setHeight(8)} />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.welcomeListContainer}>
                <FlatList
                    ref={welcomeList}
                    data={General.WELCOME_CONTENTS}
                    keyExtractor={item => item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewRef.current}
                    overScrollMode="never"
                    renderItem={({ item }) => {
                        return (
                            <WelcomeCard {...item} />
                        )
                    }}
                />
            </View>
            <Separator height={Display.setHeight(8)} />
            <Pagination index={welcomeListIndex} />
            <Separator height={Display.setHeight(8)} />
            {welcomeListIndex === 2 ? (
                <TouchableOpacity
                    style={styles.gettingStartedButton}
                    activeOpacity={0.8}
                    onPress={() => navigate()}
                >
                    <Text style={styles.gettingStartedButtonText}>Get Started</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.ButtonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.Button}
                        onPress={() => pageScroll()}
                    >
                        <Text style={styles.ButtonText}>NEXT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ marginRight: 10 }}
                        onPress={() => welcomeList.current.scrollToEnd()}
                    >
                        <Text style={styles.ButtonText}>SKIP</Text>
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
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    welcomeListContainer: {
        height: Display.setHeight(60),
    },
    ContainerPages: {
        flexDirection: "row",
    },
    page: {
        height: 8,
        width: 15,
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 32,
        marginHorizontal: 5,
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: Display.setWidth(90),
        alignItems: 'center',
    },
    ButtonText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins_Bold,
        lineHeight: 16 * 1.4
    },
    Button: {
        backgroundColor: Colors.LIGHT_GREEN,
        paddingVertical: 20,
        paddingHorizontal: 11,
        borderRadius: 40,
    },
    gettingStartedButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    gettingStartedButtonText: {
        fontSize: 20,
        color: Colors.DEFAULT_WHITE,
        lineHeight: 20 * 1.4,
        fontFamily: Fonts.Poppins_Medium,
    }
});

//make this component available to the app
export default WelcomeScreen;
