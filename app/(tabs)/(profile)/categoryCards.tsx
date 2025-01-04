import CardList from "@/components/CardList";
import CustomAppBar from "@/components/CustomAppBar";
import CustomModal from "@/components/CustomModal";
import UpdateCategoryModal from "@/components/UpdateCategoryModal";
import { Category } from "@/data/Category";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";
import { deleteCategory } from "@/store/reducers/categorySlice";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Menu, PaperProvider } from "react-native-paper";

export default function CategoryCards() {
    const params = useSearchParams();
    const router = useRouter();
    const categoryIdString: string = params.get('id') ?? '';
    const userId = 0;
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards)
    const categories = useAppSelector((state: RootState) => state.categories.categories)
    const [categoryFlashcards, setCategoryFlashcards] = useState(flashcards);
    const [category, setCategory] = useState<Category>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (flashcards && categoryIdString && !isNaN(parseInt(categoryIdString.trim()))) {
            const category = getCategory();
            const filteredFlashcards = flashcards.filter((card) => card.userId == userId && card.categoryId == category?.id);
            setCategoryFlashcards(filteredFlashcards);
        }
    }, [flashcards])

    useEffect(() => {
        if (categoryIdString && !isNaN(parseInt(categoryIdString.trim()))) {
            const category = getCategory();
            setCategory(category);
        }
    }, [categories])



    const getCategory = (): Category | undefined => {
        const categoryId: number = parseInt(categoryIdString.trim());
        return categories.find((category) => category.id === categoryId);
    }

    const [menuVisible, setMenuVisible] = React.useState(false);
    const [updateCardModalVisible, setUpdateCardModalVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const onPressDelete = () => {
        if (category) {
            dispatch(deleteCategory(category));
            router.back();
        }
    }

    const onPressEdit = () => {
        setUpdateCardModalVisible(true);
        closeMenu();
    }

    const closeUpdateCardModal = () => setUpdateCardModalVisible(false)

    return (
        <PaperProvider>
            <CustomAppBar title={category?.name ?? ""} isOnBackPressVisible>
                <View>
                    <Menu
                        visible={menuVisible}
                        onDismiss={closeMenu}
                        anchor={
                            <Ionicons name="ellipsis-vertical"
                                size={24}
                                style={[styles.icon, styles.ellipses]}
                                color="black"
                                onPress={openMenu} />
                        }>
                        <Menu.Item onPress={onPressEdit} title="Edit" />
                        <Menu.Item onPress={onPressDelete} title="Delete" />
                    </Menu>
                </View>
            </CustomAppBar>
            {
                categoryFlashcards.length > 0
                    ? <CardList flashcards={categoryFlashcards} />
                    : <View style={styles.noCardView}>
                        <Text style={styles.noCardMessage}>
                            No cards for the category.
                        </Text>
                    </View>
            }
            <CustomModal visible={updateCardModalVisible} hideModal={closeUpdateCardModal}>
                {
                    category
                    && <UpdateCategoryModal
                        categoryToBeUpdated={category}
                        closeModal={closeUpdateCardModal} />
                }
            </CustomModal>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    noCardView: {
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    noCardMessage: {
        fontSize: 20,
        fontStyle: 'italic',
    },
    icon: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: 'black'
    },
    ellipses: {
        alignSelf: 'center',
    },
})