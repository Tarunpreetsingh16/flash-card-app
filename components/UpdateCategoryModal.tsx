import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert, Button, Pressable, TouchableOpacity, Vibration } from 'react-native';
import LabelTextInput from '@/components/LabelTextInput';
import { Category } from '@/data/Category';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateCategory } from '@/store/reducers/categorySlice';

type UpdateCardModalProps = {
    categoryToBeUpdated: Category,
    closeModal: () => void
}

const UpdateCategoryModal = (
    {
        categoryToBeUpdated,
        closeModal
    } : UpdateCardModalProps
) => {

    const [updatedName, setUpdatedName] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        Vibration.vibrate(10);
        if (updatedName.trim().length <= 0) {
            Alert.alert(
                '',
                'Please fill all the fields'
            )
            return;
        }

        try {
            const updatedCategory = {...categoryToBeUpdated};
            updatedCategory.name = updatedName;
            dispatch(updateCategory(updatedCategory))
            closeModal();
        } catch (error) {
            console.error('Error updating flashcard:', error);
        }
    };


    return (
        <>
            <ScrollView style={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <LabelTextInput
                    placeholder="e.g. Star wars..."
                    value={updatedName}
                    onChange={setUpdatedName}
                    label='Category'
                />
            </ScrollView>
            <Text onPress={handleSubmit} style={styles.updateCard} allowFontScaling={true}>Update</Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 8
    },
    updateCard: {
        width: 70,
        color: '#4682B4',
        textTransform: 'uppercase',
        fontWeight: 500,
        alignSelf: 'center',
        margin: 10
    }
});
export default UpdateCategoryModal;