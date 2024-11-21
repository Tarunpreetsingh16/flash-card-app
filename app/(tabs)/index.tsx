import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';


interface Flashcard {
    id: number;
    front: string;
    back: string;
    tags: string[];
}

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
        <View style={styles.flashcardItem}>
            <Text>{item.front}</Text>
        </View>
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
    },
    flashcardItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
});

export default FlashcardList;