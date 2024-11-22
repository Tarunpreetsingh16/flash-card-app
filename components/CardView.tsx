import { Flashcard } from "@/data/FlashCard";
import { useEffect, useState } from "react";
import { Button, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface CardViewData {
    flashCard: Flashcard,
    style?: StyleProp<ViewStyle> 
}

export default function CardView(cardViewData: CardViewData) {
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('')

    useEffect(() => {
        revealAnswer 
            ? setButtonTitle('Hide Answer') 
            : setButtonTitle('Show Answer')
    }, [revealAnswer])


    const {flashCard,style} = cardViewData;
    return (
        <View style={[styles.flashcardItem, style]}>
            <Text>{flashCard.front}</Text>
            <Button title={buttonTitle} onPress={() => setRevealAnswer(!revealAnswer)}/>
            {
                revealAnswer ? 
                    <Text>
                        {flashCard.back}
                    </Text>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    flashcardItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
});