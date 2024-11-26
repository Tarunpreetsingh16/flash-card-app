import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { Flashcard } from '@/data/FlashCard';
import CardView from '@/components/CardView';


const FlashcardList: React.FC = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
    const router = useRouter();

    useFocusEffect(React.useCallback(() => {
        const loadFlashcards = async () => {
            try {
                const storedFlashcards = await AsyncStorage.getItem('flashcards');
                setFlashcards(null);
                if (storedFlashcards !== null) {
                    const flashcards: Flashcard[] = JSON.parse(storedFlashcards);
                    setFlashcards(flashcards.reverse());
                }
            } catch (error) {
                console.error('Error loading flashcards:', error);
            }
        };

        loadFlashcards();

    }, []));

    const routeToCardCreation = () => {
        router.push('/(tabs)/addCard');
    }

    const renderItem = ({ item }: { item: Flashcard }) => (
        <CardView flashCard={item} />
    );

    return (
        <>
            {
                flashcards
                    ? <FlatList
                        data={flashcards}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    : <View style={styles.noCardView}>
                        <Text style={styles.noCardMessage} onPress={routeToCardCreation}>
                            Let's create my first card!
                        </Text>
                    </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    noCardView: {
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    noCardMessage: {
        fontSize: 20,
        fontStyle: 'italic',
    }
});

export default FlashcardList;