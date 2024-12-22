import CardList from "@/components/CardList";
import CustomAppBar from "@/components/CustomAppBar";
import { Category } from "@/data/Category";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";
import { deleteCategory } from "@/store/reducers/categorySlice";
import { FontAwesome } from "@expo/vector-icons";
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
            const categoryId: number = parseInt(categoryIdString.trim());
            const category = categories.find((category) => category.id === categoryId);
            setCategory(category);
            const filteredFlashcards = flashcards.filter((card) => card.userId == userId && card.categoryId == category?.id);
            setCategoryFlashcards(filteredFlashcards.reverse());
        }
    }, [])

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const onPressDelete = () => {
        if (category) {
            dispatch(deleteCategory(category));
            router.back();
        }
    }

    return (
        <PaperProvider>
            <CustomAppBar title={category?.name ?? ""} isOnBackPressVisible>
                <View>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <FontAwesome name="ellipsis-v"
                                style={[styles.icon, styles.ellipses]}
                                onPress={openMenu} />}>
                        <Menu.Item onPress={() => { }} title="Edit" />
                        <Menu.Item onPress={onPressDelete} title="Delete" />
                    </Menu>
                </View>
            </CustomAppBar>
            {
                flashcards.length > 0
                    ? <CardList flashcards={categoryFlashcards} />
                    : <View style={styles.noCardView}>
                        <Text style={styles.noCardMessage}>
                            No cards for the category.
                        </Text>
                    </View>
            }
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
        fontSize: 18,
        paddingHorizontal: 10,
        color: 'black'
    },
    ellipses: {
        alignSelf: 'center',
    },
})