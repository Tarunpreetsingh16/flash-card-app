import { Flashcard } from "@/data/FlashCard";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleProp, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface CardViewData {
    flashCard: Flashcard,
    style?: StyleProp<ViewStyle>
}

export default function CardView(cardViewData: CardViewData) {
    const rotation = useSharedValue(0); // Initialize rotation
    const [isFlipped, setIsFlipped] = useState(false);

    const frontStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: `${rotation.value}deg` }]
        }
    });

    const backStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: `${rotation.value + 180}deg` }]
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

    const { flashCard, style } = cardViewData;

    return (

        <Animated.View style={[styles.flashcardItem, style, !isFlipped ? frontStyle : backStyle]}>
            <View>
                <View style={[styles.profileContainer]}>
                    <Image source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/small-dogs-yorkipoo-6626b45068df9.jpg?crop=0.466xw:0.872xh;0.279xw,0.0204xh&resize=980:*' }}
                        style={styles.profilePic} />
                    <Text style={styles.username}>jimmy._96</Text>
                </View>
            </View>
            <Animated.Text style={[styles.questionAndAnswer]}>Q: {flashCard.front}</Animated.Text>
            {
                isFlipped
                && <Animated.Text style={[styles.questionAndAnswer, styles.answer]}>A: {flashCard.back}</Animated.Text>
            }
            {flashCard.imageUri && flashCard.imageUri.trim().length != 0 ? <Image source={{ uri: flashCard.imageUri }} style={styles.postPicture} /> : null}

            <View style={styles.attributes}>
                <View style={styles.cardAttributes}>
                    <View style={styles.attributeView}>
                        <FontAwesome name="thumbs-o-up" style={styles.icon} />
                        <Text>{flashCard.likes}</Text>
                    </View>

                    <View style={styles.attributeView}>
                        <FontAwesome name="thumbs-o-down" style={styles.icon} />
                        <Text>{flashCard.dislikes}</Text>
                    </View>

                    <View style={styles.attributeView}>
                        <FontAwesome name="share" style={styles.icon} />
                        <Text>{flashCard.shares}</Text>
                    </View>
                </View>
                <View style={styles.otherAttributes}>
                    <FontAwesome name="bookmark" style={styles.icon} />
                    <FontAwesome name="ellipsis-v" style={styles.icon} />
                </View>
            </View>
            <Pressable style={[styles.cardBottom]}
                onPress={isFlipped ? showFront : showBack}
                delayLongPress={500}>
                {
                    <Text style={styles.flipButton}>FLIP</Text>
                }
            </Pressable>
        </Animated.View>
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
    questionAndAnswer: {
        fontSize: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backfaceVisibility: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginVertical: 5
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
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
    icon: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: 'black'
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
    }
});