import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert, Vibration } from 'react-native';
import { Flashcard } from '@/data/FlashCard';
import LabelTextInput from '@/components/LabelTextInput';
import CustomImagePicker from '@/components/CustomImagePicker';
import { useNavigation, useRouter } from 'expo-router';
import CustomSwitch from '@/components/CustomLabelSwitch';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addFlashcard } from '@/store/reducers/flashcardSlice';
import { Category } from '@/data/Category';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';
import SearchableDropdown from '@/components/SearchableDropdown';

const AddCard: React.FC = () => {
    const getFlashcard = () => {
        const category: Category = {
            id: 0,
            count: 0,
            name: '',
        }
        const newFlashcard: Flashcard = {
            id: 0,
            userId: 0,
            front: '',
            back: '',
            tags: [],
            imageUri: null,
            isPrivate: false,
            options: [],
            category
        }

        return newFlashcard;
    }

    const navigation = useNavigation();
    const [flashcard, setFlashcard] = useState(getFlashcard());
    const flashcardRef = useRef(flashcard);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [searchKey, setSearchKey] = useState('');
    const categories = useAppSelector((state: RootState) => state.categories.categories)

    const onSearchKeyChange = (val: string) => {
        setSearchKey(val);
    }
    console.log({searchKey});

    const handleSubmit = async () => {
        Vibration.vibrate(10);
        if (!flashcardRef.current.front || !flashcardRef.current.back) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }

        try {
            const newFlashcard: Flashcard = {
                id: 0,
                userId: 1,
                front: flashcardRef.current.front,
                back: flashcardRef.current.back,
                tags: flashcardRef.current.tags,
                imageUri: flashcardRef.current.imageUri,
                isPrivate: flashcardRef.current.isPrivate,
                options: [],
                category: flashcardRef.current.category
            }

            dispatch(addFlashcard(newFlashcard));

            updateFlashcard();
            router.push("/(tabs)");
        } catch (error) {
            console.error('Error creating flashcard:', error);
        }
    };


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Text onPress={handleSubmit} style={styles.createCard}>Create</Text>
            ),
        });
    }, [navigation]);
    
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
            <CustomSwitch isSwitchOn={flashcard.isPrivate} onSwitchToggle={updateIsPrivate} />
            <SearchableDropdown label='Category' onChange={onSearchKeyChange} placeholder='Create or search a category' searchKey={searchKey} />
            <CustomImagePicker
                imageUri={flashcard.imageUri}
                setImageUri={updateImageUri}
            />

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
    }
});

export default AddCard;