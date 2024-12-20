import CardList from "@/components/CardList";
import CustomAppBar from "@/components/CustomAppBar";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserCards() {
    const userId = 0;
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards)
    const [userFlashcards, setUserFlashcards] = useState(flashcards);

    useEffect(() => {
        if (flashcards) {
            const filteredFlashcards = flashcards.filter((card) => card.userId == userId);
            setUserFlashcards(filteredFlashcards.reverse());
        }
    }, [flashcards])

    return (
        <>
            <CustomAppBar title="My Cards" isOnBackPressVisible />
            {
                flashcards.length > 0
                    ? <CardList flashcards={userFlashcards} />
                    : <View style={styles.noCardView}>
                        <Text style={styles.noCardMessage}>
                            Let's create my first card!
                        </Text>
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    noCardView: {
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    noCardMessage: {
        fontSize: 20,
        fontStyle: 'italic',
    },
})