import CardList from "@/components/CardList";
import CustomAppBar from "@/components/CustomAppBar";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";
import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserCards() {
    const userId = 0;
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards)
    const [userFlashcards, setUserFlashcards] = useState(flashcards);
    const params = useSearchParams();
    const favorite = params.get('favorite');

    useEffect(() => {
        if (flashcards) {
            const filteredFlashcards = flashcards.filter((card) => card.userId == userId && (favorite ? card.favorite : true));
            setUserFlashcards(filteredFlashcards.reverse());
        }
    }, [flashcards])
    return (
        <>
            <CustomAppBar title={favorite ? "Favorite Cards" : "My Cards"} isOnBackPressVisible />
            {
                userFlashcards.length > 0
                    ? <CardList flashcards={userFlashcards} />
                    : <View style={styles.noCardView}>
                        {
                            favorite ?
                                <Text style={styles.noCardMessage}>
                                    Add your cards as favorite!
                                </Text> :
                                <Text style={styles.noCardMessage}>
                                    Let's create my first card!
                                </Text>
                        }

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