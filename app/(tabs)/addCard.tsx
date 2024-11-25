import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flashcard } from '@/data/FlashCard';
import LabelTextInput from '@/components/LabelTextInput';
import CustomImagePicker from '@/components/CustomImagePicker';
import { useNavigation } from 'expo-router';

const AddCard: React.FC = () => {
    const [front, setFront] = useState('');
    const frontRef = useRef(front);
    const [back, setBack] = useState('');
    const backRef = useRef(back);
    const [tags, setTags] = useState('');
    const tagsRef = useRef(tags);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const imageUriRef = useRef(imageUri);
    
    const router = useNavigation();

    useEffect(() => {
        router.setOptions({
            headerRight: () => (
                <Text onPress={handleSubmit} style={styles.createCard}>Create</Text>
            ),
        });
    }, []);

    const handleSubmit = async () => {
        if (!frontRef.current || !backRef.current || !tagsRef.current) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }

        try {
            const tagList = tagsRef.current.trim().split(',');

            const existingFlashcards = await AsyncStorage.getItem('flashcards') || '[]';
            const flashcards: Flashcard[] = JSON.parse(existingFlashcards);

            const newFlashcard: Flashcard = new Flashcard(
                flashcards.length > 0 ? flashcards[flashcards.length - 1].id + 1 : 1,
                frontRef.current,
                backRef.current,
                tagList,
                imageUriRef.current
            );

            flashcards.push(newFlashcard);

            await AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
            console.log("Added a flashcard to storage!")

            updateFront('');
            updateBack('');
            updateTags('');
            updateImageUri('');
            Alert.alert(
                '',
                'Card created'
            )
        } catch (error) {
            console.error('Error creating flashcard:', error);
        }
    };

    const updateFront = (text: string) => {
        frontRef.current = text;
        setFront(frontRef.current);
    }
    const updateBack = (text: string) => {
        backRef.current = text;
        setBack(backRef.current);
    }
    const updateTags = (text: string) => {
        tagsRef.current = text;
        setTags(tagsRef.current);
    }
    const updateImageUri = (text: string) => {
        imageUriRef.current = text;
        setImageUri(imageUriRef.current);
    }

    return (
        <ScrollView style={styles.container}>
            <LabelTextInput
                placeholder="Front of flashcard"
                value={front}
                onChange={updateFront}
                label='Question'
            />
            <LabelTextInput
                placeholder="Back of flashcard"
                value={back}
                onChange={updateBack}
                label='Answer'
            />
            <LabelTextInput
                placeholder="Comma separate tags"
                value={tags.toString()}
                onChange={updateTags}
                label='Tags'
            />
            <CustomImagePicker
                imageUri={imageUri}
                setImageUri={updateImageUri}
            />
        </ScrollView>
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
    createCard: {
        width: 70,
        color: '#4682B4',
        textTransform: 'uppercase',
        fontWeight: 500
    }
});

export default AddCard;