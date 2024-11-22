import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Flashcard } from '@/data/FlashCard';
import CardView from '@/components/CardView';


const FlashcardList: React.FC = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    useFocusEffect(React.useCallback(() => {
        const loadFlashcards = async () => {
            try {
                const storedFlashcards = await AsyncStorage.getItem('flashcards');
                console.log({storedFlashcards});
                if (storedFlashcards !== null) {
                    setFlashcards(JSON.parse(storedFlashcards));
                }
            } catch (error) {
                console.error('Error loading flashcards:', error);
            }
        };

        loadFlashcards();

    }, []));

    const renderItem = ({ item }: { item: Flashcard }) => (
        <CardView flashCard={item} />
    );

    return (
        <FlatList
            data={flashcards}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
    }
});

export default FlashcardList;