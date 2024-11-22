import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flashcard } from '@/data/FlashCard';

const AddCard: React.FC = () => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async () => {
        if (!front || !back || !tags) {
            return;
        }

        try {
            const tagList = tags.trim().split(',');

            const existingFlashcards = await AsyncStorage.getItem('flashcards') || '[]';
            const flashcards: Flashcard[] = JSON.parse(existingFlashcards);

            const newFlashcard: Flashcard = {
                id: flashcards.length > 0 ? flashcards[flashcards.length - 1].id + 1 : 1,
                front,
                back,
                tags: tagList
            };

            flashcards.push(newFlashcard);

            await AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
            console.log("Added a flashcard to storage!")

            setFront('');
            setBack('');
            setTags('');
        } catch (error) {
            console.error('Error creating flashcard:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Front of flashcard"
                value={front}
                onChangeText={setFront}
            />
            <TextInput
                style={styles.input}
                placeholder="Back of flashcard"
                value={back}
                onChangeText={setBack}
            />
            <TextInput
                style={styles.input}
                placeholder="Comma separate tags"
                value={tags.toString()}
                onChangeText={setTags}
            />
            <Button title="Create Flashcard" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
});

export default AddCard;