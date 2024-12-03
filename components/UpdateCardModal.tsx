import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert, Button, Pressable, TouchableOpacity, Vibration } from 'react-native';
import { Flashcard } from '@/data/FlashCard';
import LabelTextInput from '@/components/LabelTextInput';
import CustomSwitch from '@/components/CustomLabelSwitch';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateFlashcard } from '@/store/reducers/flashcardSlice';

type UpdateCardModalProps = {
    flashcardToBeUpdated: Flashcard,
    closeModal: () => void
}

const UpdateCardModal = (
    { flashcardToBeUpdated, closeModal }: UpdateCardModalProps
) => {
    const [flashcard, setFlashcard] = useState(flashcardToBeUpdated);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!flashcard) {
            Alert.alert(
                "",
                "No card found to be edited",
                [
                    {
                        text: "Take me to my feed.",
                        onPress: closeModal,
                    },
                ]
            );
        }

    }, []);

    const handleSubmit = () => {
        Vibration.vibrate(10);
        if (flashcard.front.trim().length <= 0 || flashcard.back.trim().length <= 0) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }

        try {
            dispatch(updateFlashcard(flashcard))
            closeModal();
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
        <>
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
            </ScrollView>
            <Text onPress={handleSubmit} style={styles.updateCard} allowFontScaling={true}>Update</Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 8
    },
    updateCard: {
        width: 70,
        color: '#4682B4',
        textTransform: 'uppercase',
        fontWeight: 500,
        alignSelf: 'center',
        margin: 10
    }
});
export default UpdateCardModal;