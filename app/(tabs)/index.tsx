import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import CardList from '@/components/CardList';
import FlashcardUtility from '@/utils/FlashcardUtility';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setFlashcards } from '@/store/reducers/flashcardSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';


const FlashcardList: React.FC = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards)

    useEffect(() => {
        const loadFlashcards = async () => {
            const storedFlashcards = await FlashcardUtility.loadFlashcards()
            if (storedFlashcards) {
                dispatch(setFlashcards(storedFlashcards.reverse()));
            }
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

    const routeToProfile = () => {
        router.push('/(profile)/profile');
    }

    const routeToCardCreation = () => {
        router.push('/(tabs)/addCard');
    }

    return (
        <>
            {
                flashcards.length > 0
                    ? <CardList flashcards={flashcards} />
                    : <View style={styles.noCardView}>
                        <Text style={styles.noCardMessage} onPress={routeToCardCreation}>
                            Let's create my first card!
                        </Text>
                    </View>
            }
        </>
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