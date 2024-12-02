import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flashcard } from '@/data/FlashCard';
import LabelTextInput from '@/components/LabelTextInput';
import CustomImagePicker from '@/components/CustomImagePicker';
import { useNavigation, useRouter } from 'expo-router';
import CustomSwitch from '@/components/CustomLabelSwitch';
import FlashcardUtility from '@/utils/FlashcardUtility';

const AddCard: React.FC = () => {
    const getFlashcard = () => {
        const newFlashcard: Flashcard = new Flashcard(
            0,
            0,
            '',
            '',
            [],
            null,
            false
        )

        return newFlashcard;
    }


    const [flashcard, setFlashcard] = useState(getFlashcard());
    const flashcardRef = useRef(flashcard);

    const navigation = useNavigation();
    const router = useRouter();

    const handleSubmit = async () => {
        if (!flashcardRef.current.front || !flashcardRef.current.back) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }

        try {

            const existingFlashcards = await AsyncStorage.getItem('flashcards') || '[]';
            const flashcards: Flashcard[] = JSON.parse(existingFlashcards);

            const newFlashcard: Flashcard = new Flashcard(
                flashcards.length > 0 ? flashcards[flashcards.length - 1].id + 1 : 1,
                0,
                flashcardRef.current.front,
                flashcardRef.current.back,
                flashcardRef.current.tags,
                flashcardRef.current.imageUri,
                flashcardRef.current.isPrivate
            );

            flashcards.push(newFlashcard);

            await FlashcardUtility.saveCards(flashcards);

            updateFlashcard();
            Alert.alert(
                '',
                'Card created',
                [
                    {
                        text: "Take me to my feed.",
                        onPress: () => router.push('/(tabs)')
                    }
                ]
            )
        } catch (error) {
            console.error('Error creating flashcard:', error);
        }
    };

    const updateFront = (front: string) => {
        const updatedCard = { ...flashcard, front };
        flashcardRef.current = updatedCard;
        setFlashcard(updatedCard);
    }

    const updateBack = (back: string) => {
        const updatedCard = { ...flashcard, back };
        flashcardRef.current = updatedCard;
        setFlashcard(updatedCard);
    }

    const updateImageUri = (imageUri: string | null) => {
        const updatedCard = { ...flashcard, imageUri };
        flashcardRef.current = updatedCard;
        setFlashcard(updatedCard);
    }

    const updateIsPrivate = (isPrivate: boolean) => {
        const updatedCard = { ...flashcard, isPrivate };
        flashcardRef.current = updatedCard;
        setFlashcard(updatedCard);
    }

    const updateTags = (tags: string) => {
        const updatedCard = { ...flashcard, tags: tags.trim().split(',') };
        flashcardRef.current = updatedCard;
        setFlashcard(updatedCard);
    }

    const updateFlashcard = () => {
        flashcardRef.current = getFlashcard();
        setFlashcard(flashcardRef.current);
    }

    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <LabelTextInput
                placeholder="Front of flashcard..."
                value={flashcard.front}
                onChange={updateFront}
                label='Question'
            />
            <LabelTextInput
                placeholder="Correct answer..."
                value={flashcard.back}
                onChange={updateBack}
                label='Answer'
            />
            <LabelTextInput
                placeholder="Comma separate tags"
                value={flashcard.tags.toString()}
                onChange={updateTags}
                label='Tags'
            />
            <CustomSwitch isSwitchOn={flashcard.isPrivate} onSwitchToggle={updateIsPrivate} />
            <CustomImagePicker
                imageUri={flashcard.imageUri}
                setImageUri={updateImageUri}
            />
            <Text onPress={handleSubmit} style={styles.createCard} allowFontScaling={true}>Create</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        margin: 8
    },
    createCard: {
        width: 70,
        color: '#4682B4',
        textTransform: 'uppercase',
        fontWeight: 500,
        alignSelf: 'center',
        marginVertical: 50
    }
});

export default AddCard;