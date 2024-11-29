import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { Flashcard } from '@/data/FlashCard';
import CardList from '@/components/CardList';


const FlashcardList: React.FC = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
    const router = useRouter();
    const navigation = useNavigation();
    useFocusEffect(React.useCallback(() => {
        const loadFlashcards = async () => {
            try {
                const storedFlashcards = await AsyncStorage.getItem('flashcards');
                setFlashcards(null);
                if (storedFlashcards !== null) {
                    let flashcards: Flashcard[] = JSON.parse(storedFlashcards);
                    // flashcards = flashcards.filter((card) => card.userId != userId);
                    setFlashcards(flashcards.reverse());
                }
            } catch (error) {
                console.error('Error loading flashcards:', error);
            }
        };
        loadFlashcards();
    }, []));

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
                flashcards
                    ? <CardList flashcards={flashcards}/>
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