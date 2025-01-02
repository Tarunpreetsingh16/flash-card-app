import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, Alert, Vibration } from 'react-native';
import { Flashcard } from '@/data/FlashCard';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateFlashcard } from '@/store/reducers/flashcardSlice';
import { Category } from '@/data/Category';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';
import SearchableDropdown, { SearchableDropdownItem } from '@/components/SearchableDropdown';
import { addCategory } from '@/store/reducers/categorySlice';
import CustomAppBar from '@/components/CustomAppBar';
import { useSearchParams } from 'expo-router/build/hooks';
import { ScrollView } from 'react-native-gesture-handler';

const ChangeCategory: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state: RootState) => state.categories.categories)
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards)
    const categoryNextId = useAppSelector((state: RootState) => state.categories.nextId)
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [category, setCategory] = useState<Category | null>();

    const params = useSearchParams();
    const flashcardIdString = params.get("flashcardId");
    const [flashcard, setFlashcard] = useState<Flashcard>();
    const userId = 0;

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

    console.log(category);

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
                && lowercasedTerm.trim().length > 0
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
        if (!category && !searchTerm.trim().length) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }
        let selectedCategory = category;
        if (!selectedCategory) {
            selectedCategory = {
                id: categoryNextId,
                name: searchTerm,
                userId: userId
            } as Category;
            dispatch(addCategory(selectedCategory))
        }

        try {
            if (flashcard) {
                const newFlashcard = { ...flashcard };
                newFlashcard.categoryId = selectedCategory.id;

                dispatch(updateFlashcard(newFlashcard));
                router.back();
            }
        } catch (error) {
            console.error('Error updating flashcard:', error);
        }
    };

    const updateSearchTerm = (val: string) => {
        setSearchTerm(val);
        setCategory(null);
    }

    const updateCategory = (id: number) => {
        let category = categories.find((category: Category) => category.id === id);
        setCategory(category);
    }

    return (
        <>
            <CustomAppBar title="Change Category" isOnBackPressVisible>
                <Text onPress={handleSubmit} style={styles.createCard}>Save</Text>
            </CustomAppBar>

            <ScrollView style={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                
            >
                <SearchableDropdown
                    label='Category'
                    onValueChange={updateSearchTerm}
                    placeholder='Create or search a category'
                    searchKey={searchTerm}
                    hits={filteredCategories}
                    onOptionSelect={updateCategory}
                />
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

export default ChangeCategory;