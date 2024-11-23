import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Flashcard } from '@/data/FlashCard';
import CardView from '@/components/CardView';
import { useSearchParams } from 'expo-router/build/hooks';


const FlashcardList: React.FC = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const params = useSearchParams();

    const keyword = params.get('keyword');

    useFocusEffect(React.useCallback(() => {
        const loadFlashcards = async () => {
            try {
                const storedFlashcards = await AsyncStorage.getItem('flashcards');
                if (storedFlashcards !== null) {
                    const parsedFlascards: Flashcard[] = JSON.parse(storedFlashcards);
                    const filteredFlashcards = parsedFlascards.filter((card: Flashcard) => {
                        const tags: string[] = card.tags;
                        return tags.includes(keyword ?? '');
                    })
                    setFlashcards(filteredFlashcards);
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