import { Flashcard } from "@/data/FlashCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateFlashcard } from "@/store/reducers/flashcardSlice";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Platform, Pressable, StyleProp, StyleSheet, Text, Vibration, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface CardViewData {
    flashCard: Flashcard,
    style?: StyleProp<ViewStyle>,
    openMoreOptions: () => void
}

export default function CardView(cardViewData: CardViewData) {
    const dispatch = useAppDispatch();
    const rotation = useSharedValue(0); // Initialize rotation
    const [isFlipped, setIsFlipped] = useState(false);

    const frontStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: `${rotation.value}deg` }],
        }
    });

    const backStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: `${rotation.value + 180}deg` }],
        }
    });

    const showBack = () => {
        rotation.value = withSpring(180);
        setIsFlipped(true);
    };

    const showFront = () => {
        rotation.value = withSpring(0);
        setIsFlipped(false);
    };

    const triggerOpen = () => {
        Vibration.vibrate(1)
        cardViewData.openMoreOptions();
    }

    const onFavoritePress = () => {
        Vibration.vibrate(50)
        dispatch(updateFlashcard({...flashCard, favorite: !flashCard.favorite}));
    }

    const onSavePress = () => {
        Vibration.vibrate(50);
        dispatch(updateFlashcard({...flashCard, saved: !flashCard.saved}));
    }

    const { flashCard, style } = cardViewData;

    return (

        <View style={[styles.flashcardItem]} >
            <View style={[styles.cardHeader]}>
                <View style={[styles.profileContainer]}>
                    <Image source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/small-dogs-yorkipoo-6626b45068df9.jpg?crop=0.466xw:0.872xh;0.279xw,0.0204xh&resize=980:*' }}
                        style={styles.profilePic} />
                    <Text style={styles.username}>jimmy._96</Text>
                </View>
                <View style={styles.cardHeaderRight}>
                    {
                        flashCard.userId === 0
                        && <Ionicons
                            name={flashCard.favorite ? "heart" : "heart-outline"}
                            style={[styles.icon]}
                            onPress={onFavoritePress} />
                    }
                    {flashCard.isPrivate &&
                        <Ionicons name="lock-closed"
                            style={[styles.icon]}
                            size={24}
                            onPress={() => { }} />}
                    <Ionicons name={Platform.OS === 'ios' ? "ellipsis-horizontal" : "ellipsis-vertical"}
                        size={24}
                        style={[styles.icon, styles.ellipses]}
                        color="black"
                        onPress={triggerOpen} />
                </View>
            </View>
            <Pressable onPress={isFlipped ? showFront : showBack} >
                <Animated.View
                    style={[styles.flashcardItem,
                    styles.mainContent, style,
                    !isFlipped ? frontStyle : backStyle,
                    { pointerEvents: 'box-none' }
                    ]} >
                    <Text style={[styles.questionAndAnswer]}>Q: {flashCard.front}</Text>
                    {
                        isFlipped
                        && <Text style={[styles.questionAndAnswer, styles.answer]}>A: {flashCard.back}</Text>
                    }
                    {flashCard.imageUri && flashCard.imageUri.trim().length != 0 ? <Image source={{ uri: flashCard.imageUri }} style={styles.postPicture} /> : null}
                </Animated.View>
            </Pressable>

            <View style={styles.attributes}>
                <View style={styles.cardAttributes}>
                    <View style={styles.attributeView}>
                        <Ionicons name="arrow-up-circle-outline"
                            style={[styles.icon]}
                            size={24}
                            color={'green'}
                            onPress={() => { }} />
                        <Text>{flashCard.likes}</Text>
                    </View>

                    <View style={styles.attributeView}>
                        <Ionicons name="arrow-down-circle-outline"
                            style={[styles.icon]}
                            size={24}
                            color={'black'}
                            onPress={() => { }} />
                        <Text>{flashCard.dislikes}</Text>
                    </View>

                    <View style={styles.attributeView}>

                        <Ionicons name="share-outline"
                            style={[styles.icon]}
                            size={24}
                            color={'black'}
                            onPress={() => { }} />
                        <Text>{flashCard.shares}</Text>
                    </View>
                </View>
                {
                    flashCard.userId != 0
                        ? <View style={styles.otherAttributes}>
                            <Ionicons name={flashCard.saved ? "bookmark" : "bookmark-outline"} 
                                style={[styles.icon]}
                                size={24}
                                color="black"
                                onPress={onSavePress} />
                        </View>
                        : null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flashcardItem: {
        marginVertical: 3,
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: '#000',
    },
    mainContent: {
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'rgba( 0,0,0,0.2)'
    },
    questionAndAnswer: {
        fontSize: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backfaceVisibility: 'hidden',
        marginVertical: 5
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profilePic: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
        borderRadius: 75,
        borderWidth: 1,
        marginRight: 10
    },
    username: {
        fontWeight: 500
    },
    answer: {
        fontStyle: 'italic',
    },
    attributes: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between'
    },
    button: {
        textTransform: 'uppercase',
        marginVertical: 10,
        color: '#6F6D6D',
        fontWeight: 500
    },
    cardAttributes: {
        display: 'flex',
        flexDirection: 'row'
    },
    otherAttributes: {
        display: 'flex',
        flexDirection: 'row',
    },
    attributeView: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    postPicture: {
        marginVertical: 5,
        width: '100%',
        aspectRatio: 1
    },

    options: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    option: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
    },
    correctOption: {
        borderColor: '#99F071',
        backgroundColor: '#C8F0B6',
    },
    wrongOption: {
        borderColor: '#F04848',
        backgroundColor: '#F19696',
    },
    flipButton: {
        alignSelf: 'center',
        color: '#4682B4',
        textTransform: 'uppercase',
        fontWeight: 500
    },
    cardBottom: {
        padding: 10,
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10
    },
    icon: {
        fontSize: 22,
        paddingHorizontal: 10,
        color: 'black'
    },
    ellipses: {
        alignSelf: 'center',
    },
    cardHeaderRight: {
        display: 'flex',
        flexDirection: 'row'
    }
});