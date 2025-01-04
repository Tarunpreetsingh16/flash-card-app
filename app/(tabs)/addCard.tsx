import React, { useMemo,useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert, Vibration } from 'react-native';
import { Flashcard } from '@/data/FlashCard';
import LabelTextInput from '@/components/LabelTextInput';
import CustomImagePicker from '@/components/CustomImagePicker';
import CustomSwitch from '@/components/CustomLabelSwitch';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addFlashcard } from '@/store/reducers/flashcardSlice';
import { Category } from '@/data/Category';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';
import SearchableDropdown, { SearchableDropdownItem } from '@/components/SearchableDropdown';
import { addCategory } from '@/store/reducers/categorySlice';
import CustomAppBar from '@/components/CustomAppBar';
type AddCardScreenProps = {
    routeToFeedScreen: () => void;
}
const AddCardScreen = ({
    routeToFeedScreen
}: AddCardScreenProps) => {
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

    const [flashcard, setFlashcard] = useState(getFlashcard());
    const dispatch = useAppDispatch();
    const categoryNextId = useAppSelector((state: RootState) => state.categories.nextId)
    const flashcardNextId = useAppSelector((state: RootState) => state.flashcards.nextId)
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [category, setCategory] = useState<Category | null>();
    const userId = 0;
    const categories = useAppSelector((state: RootState) => state.categories.categories).filter((category) => category.userId == 0);

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
        if (!flashcard.front || !flashcard.back) {
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
                name: searchTerm.trim(),
                userId: userId
            } as Category;
            dispatch(addCategory(selectedCategory))
        }
        console.log({ second: selectedCategory });

        try {
            const newFlashcard: Flashcard = {
                id: flashcardNextId,
                userId: userId,
                front: flashcard.front,
                back: flashcard.back,
                tags: flashcard.tags,
                imageUri: flashcard.imageUri,
                isPrivate: flashcard.isPrivate,
                options: [],
                categoryId: selectedCategory.id
            }
            console.log("newFlashcard", newFlashcard);
            dispatch(addFlashcard(newFlashcard));

            updateFlashcard();
            routeToFeedScreen();
        } catch (error) {
            console.error('Error creating flashcard:', error);
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

    const updateImageUri = (imageUri: string | null) => {
        const updatedCard = { ...flashcard, imageUri };
        setFlashcard(updatedCard);
    }

    const updateIsPrivate = (isPrivate: boolean) => {
        const updatedCard = { ...flashcard, isPrivate };
        setFlashcard(updatedCard);
    }

    const updateFlashcard = () => {
        setFlashcard(getFlashcard());
        setSearchTerm('');
        setCategory(null);
        setDebouncedTerm(searchTerm);
    }

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
            <CustomAppBar title="Add Card">
                <Text onPress={handleSubmit} style={styles.createCard}>Create</Text>
            </CustomAppBar>

            <ScrollView style={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <LabelTextInput
                    placeholder="Front of the flashcard..."
                    value={flashcard.front}
                    onChange={updateFront}
                    label='Question'
                />
                <LabelTextInput
                    placeholder="Back of the flashcard..."
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

export default AddCardScreen;