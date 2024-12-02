import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert, Button, Pressable, TouchableOpacity, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flashcard } from '@/data/FlashCard';
import LabelTextInput from '@/components/LabelTextInput';
import { useNavigation, useRouter } from 'expo-router';
import CustomSwitch from '@/components/CustomLabelSwitch';
import { useSearchParams } from 'expo-router/build/hooks';
import FlashcardUtility from '@/utils/FlashcardUtility';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';

const UpdateCard: React.FC = () => {
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
    const params = useSearchParams();
    const flashcardTobeEditedString = params.get('flashcard');
    const [flashcard, setFlashcard] = useState(getFlashcard());
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards)

    const router = useRouter();

    useEffect(() => {

        if (!flashcardTobeEditedString) {
            Alert.alert(
                "",
                "No card found to be edited",
                [
                    {
                        text: "Take me to my feed.",
                        onPress: () => router.push('/(tabs)'),
                    },
                ]
            );
        } else {
            setFlashcard(JSON.parse(flashcardTobeEditedString));
        }

    }, [flashcardTobeEditedString]);
    console.log("Updated Card Image URI outside", flashcard);

    const handleSubmit = async () => {
        Vibration.vibrate(10);
        if (flashcard.front.trim().length <= 0 || flashcard.back.trim().length <= 0) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }

        try {
            for (let i = 0; i < flashcards.length; i++) {
                if (flashcards[i].id === flashcard.id) {
                    flashcards[i] = { ...flashcard };
                    flashcards[i].imageUri = flashcard.imageUri ? encodeURI(flashcard.imageUri) : null;
                }
            }
            await FlashcardUtility.saveCards(flashcards);


            router.back();
        } catch (error) {
            console.error('Error updating flashcard:', error);
        }
    };

    const updateFront = (front: string) => {
        const updatedCard = { ...flashcard, front };
        setFlashcard(updatedCard);
    }

    const updateBack = (back: string) => {
        const updatedCard = { ...flashcard, back };
        setFlashcard(updatedCard);
    }

    const updateIsPrivate = (isPrivate: boolean) => {
        const updatedCard = { ...flashcard, isPrivate };
        setFlashcard(updatedCard);
    }

    const updateTags = (tags: string) => {
        const updatedCard = { ...flashcard, tags: tags.trim().split(',') };
        setFlashcard(updatedCard);
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
            <Text onPress={handleSubmit} style={styles.createCard} allowFontScaling={true}>Update</Text>
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
export default UpdateCard;