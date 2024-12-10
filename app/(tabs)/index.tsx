import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import CardList from '@/components/CardList';
import FlashcardUtility from '@/utils/FlashcardUtility';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setFlashcards } from '@/store/reducers/flashcardSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';
import CategoryUtility from '@/utils/CategoryUtility';
import { setCategories } from '@/store/reducers/categorySlice';


const FlashcardList: React.FC = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards)
    const [othersFlashcards, setOthersFlashcards] = useState(flashcards);

    useEffect(() => {
        const loadFlashcards = async () => {
            const storedFlashcards = await FlashcardUtility.loadFlashcards()
            const storedCategories = await CategoryUtility.loadCategories()
            if (storedFlashcards) {
                dispatch(setFlashcards(storedFlashcards));
            }
            if (storedCategories) {
                dispatch(setCategories(storedCategories));
            }
            console.log({storedCategories, storedFlashcards});
        };
        loadFlashcards();
    }, [dispatch])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable style={[styles.profileContainer]}
                    onPress={routeToProfile}>
                    <Image source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/small-dogs-yorkipoo-6626b45068df9.jpg?crop=0.466xw:0.872xh;0.279xw,0.0204xh&resize=980:*' }}
                        style={styles.profilePic}
                    />
                </Pressable>
            ),
        });
    }, []);


    useEffect(() => {
        if (flashcards) {
            const filteredFlashcards = flashcards.filter((card) => card.userId != 0 && !card.isPrivate);
            setOthersFlashcards(filteredFlashcards.reverse());
        }
    }, [flashcards])


    const routeToProfile = () => {
        router.push('/(profile)/profile');
    }

    return (
        <CardList flashcards={othersFlashcards} />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    noCardView: {
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    noCardMessage: {
        fontSize: 20,
        fontStyle: 'italic',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
        borderRadius: 75,
        borderWidth: 2,
        marginRight: 20
    }
});

export default FlashcardList;