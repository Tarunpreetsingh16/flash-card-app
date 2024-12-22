import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert, Vibration } from 'react-native';
import { Flashcard } from '@/data/FlashCard';
import LabelTextInput from '@/components/LabelTextInput';
import CustomImagePicker from '@/components/CustomImagePicker';
import { useRouter } from 'expo-router';
import CustomSwitch from '@/components/CustomLabelSwitch';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addFlashcard, updateFlashcard } from '@/store/reducers/flashcardSlice';
import { Category } from '@/data/Category';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';
import SearchableDropdown, { SearchableDropdownItem } from '@/components/SearchableDropdown';
import { addCategory } from '@/store/reducers/categorySlice';
import CustomAppBar from '@/components/CustomAppBar';
import { useSearchParams } from 'expo-router/build/hooks';

const UpdateCard: React.FC = () => {
    const getFlashcard = () => {
        const newFlashcard: Flashcard = {
            id: 0,
            userId: 0,
            front: '',
            back: '',
            tags: [],
            imageUri: null,
            isPrivate: false,
            options: [],
            categoryId: 0
        }

        return newFlashcard;
    }

    const params = useSearchParams();
    const flashcardIdString = params.get("flashcardId");
    const [flashcard, setFlashcard] = useState(getFlashcard());
    const router = useRouter();
    const dispatch = useAppDispatch();
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards);

    useEffect(() => {
        if (flashcardIdString) {
            const flashcardId = parseInt(flashcardIdString);
            for (let i = 0; i < flashcards.length; i++) {
                const card: Flashcard = flashcards[i];
                if (card.id === flashcardId) {
                    setFlashcard(card);
                }
            }
        }
    }, []);

    const handleSubmit = async () => {
        Vibration.vibrate(10);
        if (!flashcard.front || !flashcard.back) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }

        try {

            dispatch(updateFlashcard(flashcard));

            resetFlashcard();
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

    const resetFlashcard = () => {
        setFlashcard(getFlashcard());
    }

    return (
        <>
            <CustomAppBar title="Update Card" isOnBackPressVisible>
                <Text onPress={handleSubmit} style={styles.createCard}>Update</Text>
            </CustomAppBar>

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
                <CustomSwitch isSwitchOn={flashcard.isPrivate} onSwitchToggle={updateIsPrivate} />
            </ScrollView>
        </>
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
    }
});

export default UpdateCard;