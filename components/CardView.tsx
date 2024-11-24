import { Flashcard } from "@/data/FlashCard";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Button, Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface CardViewData {
    flashCard: Flashcard,
    style?: StyleProp<ViewStyle>
}

export default function CardView(cardViewData: CardViewData) {
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('')

    useEffect(() => {
        if (revealAnswer) {
            setButtonTitle('Hide')
        }
        else {
            setButtonTitle('Reveal')
        }

    }, [revealAnswer])


    const { flashCard, style } = cardViewData;
    return (
        <View style={[styles.flashcardItem, style]}>
            <View style={[styles.profileContainer, styles.postPadding]}>
                <Image source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/small-dogs-yorkipoo-6626b45068df9.jpg?crop=0.466xw:0.872xh;0.279xw,0.0204xh&resize=980:*' }}
                    style={styles.profilePic} />
                <Text style={styles.username}>jimmy._96</Text>
            </View>
            <Text style={[styles.question, styles.postPadding]}>{flashCard.front}</Text>
            {flashCard.imageUri && flashCard.imageUri.trim().length != 0 ? <Image source={{ uri: flashCard.imageUri }} style={styles.postPicture} /> : null}
                    
            <View style={styles.attributes}>
                <View style={styles.cardAttributes}>
                    <View style={styles.attributeView}>
                        <FontAwesome name="thumbs-o-up" style={styles.icon} />
                        <Text>28</Text>
                    </View>
                    
                    <View style={styles.attributeView}>
                        <FontAwesome name="thumbs-o-down" style={styles.icon} />
                        <Text>5</Text>
                    </View>
                    
                    <View style={styles.attributeView}>
                        <FontAwesome name="share-alt" style={styles.icon} />
                        <Text>5</Text>
                    </View>
                </View>
                <View style={styles.otherAttributes}>
                    <FontAwesome name="bookmark" style={styles.icon} />
                    <FontAwesome name="ellipsis-v" style={styles.icon} />
                </View>
            </View>
            <Text onPress={() => setRevealAnswer(!revealAnswer)} style={[styles.button, styles.postPadding]}>{buttonTitle} </Text>
            {revealAnswer ? <Text style={[styles.answer, styles.postPadding]}>{flashCard.back}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    flashcardItem: {
        marginVertical: 20,
    },
    question: {
        fontSize: 20
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
        fontSize: 16
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
    postPadding: {
        paddingHorizontal: 15
    }
});