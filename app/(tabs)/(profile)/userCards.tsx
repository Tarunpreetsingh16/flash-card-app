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
    const [title, setTitle] = useState('My Cards');
    const [emptyListMsg, setEmptyListMsg] = useState("Let's create my first card!");
    const params = useSearchParams();
    const type = params.get('type');

    useEffect(() => {
        if (flashcards) {
            let filteredFlashcards;
            switch (type) {
                case 'favorite':
                    filteredFlashcards = flashcards.filter((card) => card.userId == userId && card.favorite);
                    setUserFlashcards(filteredFlashcards);
                    setTitle('Favorite Cards');
                    setEmptyListMsg("Add your cards as favorite!");
                    break;
                case 'saved':
                    filteredFlashcards = flashcards.filter((card) => card.saved);
                    setUserFlashcards(filteredFlashcards);
                    setTitle('Saved Cards');
                    setEmptyListMsg("Save other's cards you like!");
                    break;
                default:
                    filteredFlashcards = flashcards.filter((card) => card.userId == userId);
                    setUserFlashcards(filteredFlashcards);
                    break;
            }
        }

    }, [flashcards])

    return (
        <>
            <CustomAppBar title={title} isOnBackPressVisible />
            {
                userFlashcards.length > 0
                    ? <CardList flashcards={userFlashcards} />
                    : <View style={styles.noCardView}>
                        <Text style={styles.noCardMessage}>
                            {emptyListMsg}
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