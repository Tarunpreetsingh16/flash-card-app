import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import SearchableDropdown, { SearchableDropdownItem } from '@/components/SearchableDropdown';
import { addCategory } from '@/store/reducers/categorySlice';

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
    const categories = useAppSelector((state: RootState) => state.categories.categories)
    const [searchTerm, setSearchTerm] = useState('');
    const searchTermRef = useRef(searchTerm);
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [category, setCategory] = useState<Category | null>();
    const categoryRef = useRef(category);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const filteredCategories = useMemo(() => {
        const filteredCategories: SearchableDropdownItem[] = [];
        const lowercasedTerm = debouncedTerm.toLowerCase();
        categories.forEach((category) => {
            if (lowercasedTerm
                && lowercasedTerm.trim().length > 2
                && category.name.toLowerCase().includes(lowercasedTerm)) {
                const idx = filteredCategories.length === 0 ? 0 : filteredCategories.length + 1;
                const item: SearchableDropdownItem = {
                    id: category.id,
                    name: category.name
                }
                filteredCategories[idx] = item;
            }
        });
        return filteredCategories;
    }, [debouncedTerm]);

    const handleSubmit = async () => {
        Vibration.vibrate(10);
        if (!flashcardRef.current.front || !flashcardRef.current.back) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }
        const category: Category = {
            id: 0,
            name: searchTermRef.current,
            count: 1
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
                category: category
            }

            dispatch(addFlashcard(newFlashcard));
            dispatch(addCategory(category))

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
        searchTermRef.current = '';
        setSearchTerm('');
        categoryRef.current = null;
        setCategory(null);
        setDebouncedTerm(searchTerm);
    }

    const updateSearchTerm = (val: string) => {
        searchTermRef.current = val;
        setCategory(null);
        setSearchTerm(val);
    }

    const updateCategory = (id: number) => {
        let category = categories.find((category: Category) => category.id === id);
        categoryRef.current = category;
        setCategory(category);
    }


    console.log({category});
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
            <SearchableDropdown
                label='Category'
                onValueChange={updateSearchTerm}
                placeholder='Create or search a category'
                searchKey={searchTerm}
                hits={filteredCategories}
                onOptionSelect={updateCategory}
            />
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