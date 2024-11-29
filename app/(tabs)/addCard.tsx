import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flashcard } from '@/data/FlashCard';
import LabelTextInput from '@/components/LabelTextInput';
import CustomImagePicker from '@/components/CustomImagePicker';
import { useNavigation, useRouter } from 'expo-router';
import CustomSwitch from '@/components/CustomLabelSwitch';

const AddCard: React.FC = () => {
    const [front, setFront] = useState('');
    const frontRef = useRef(front);
    const [back, setBack] = useState('');
    const backRef = useRef(back);
    const [tags, setTags] = useState('');
    const tagsRef = useRef(tags);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const imageUriRef = useRef(imageUri);
    const [isPrivate, setIsPrivate] = useState(false);
    const isPrivateRef = useRef(isPrivate);
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Text onPress={handleSubmit} style={styles.createCard} allowFontScaling={true}>Create</Text>
            ),
        });
    }, []);

    const handleSubmit = async () => {
        if (!frontRef.current || !backRef.current || !tagsRef.current) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }

        try {
            const tagList = tagsRef.current.trim().split(',');

            const existingFlashcards = await AsyncStorage.getItem('flashcards') || '[]';
            const flashcards: Flashcard[] = JSON.parse(existingFlashcards);

            const newFlashcard: Flashcard = new Flashcard(
                flashcards.length > 0 ? flashcards[flashcards.length - 1].id + 1 : 1,
                0,
                frontRef.current,
                backRef.current,
                tagList,
                imageUriRef.current,
                isPrivateRef.current
            );

            flashcards.push(newFlashcard);

            await AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));

            updateFront('');
            updateBack('');
            updateTags('');
            updateImageUri('');
            updateIsPrivate(false);
            Alert.alert(
                '',
                'Card created',
                [
                    {
                        text: "Take me to my feed.",
                        onPress: () => router.push('/(tabs)')
                    }
                ]
            )
        } catch (error) {
            console.error('Error creating flashcard:', error);
        }
    };

    const updateFront = (text: string) => {
        frontRef.current = text;
        setFront(frontRef.current);
    }
    const updateBack = (text: string) => {
        backRef.current = text;
        setBack(backRef.current);
    }
    const updateTags = (text: string) => {
        tagsRef.current = text;
        setTags(tagsRef.current);
    }
    const updateImageUri = (text: string | null) => {
        imageUriRef.current = text;
        setImageUri(imageUriRef.current);
    }
    const updateIsPrivate = (isPrivate: boolean) => {
        isPrivateRef.current = isPrivate;
        setIsPrivate(isPrivateRef.current);
    }

    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <LabelTextInput
                placeholder="Front of flashcard..."
                value={front}
                onChange={updateFront}
                label='Question'
            />
            <LabelTextInput
                placeholder="Correct answer..."
                value={back}
                onChange={updateBack}
                label='Answer'
            />
            <LabelTextInput
                placeholder="Comma separate tags"
                value={tags.toString()}
                onChange={updateTags}
                label='Tags'
            />
            <CustomSwitch isSwitchOn={isPrivate} onSwitchToggle={updateIsPrivate}/>
            <CustomImagePicker
                imageUri={imageUri}
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
        fontWeight: 500
    }
});

export default AddCard;