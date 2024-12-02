import React, { useLayoutEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Flashcard } from '@/data/FlashCard';
import CardView from '@/components/CardView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import CardMoreOptions from './CardMoreOption';

interface CardListProps {
    flashcards: Flashcard[] | null
}

const CardList = (props: CardListProps) => {
    const flashcards = props.flashcards;
    const [selectedCard, setSelectedCard] = useState<Flashcard | null>(null);

    const renderItem = ({ item }: { item: Flashcard }) => (
        <CardView flashCard={item} openMoreOptions={() => openBottomSheet(item)} />
    );
    const bottomSheetRef = useRef<BottomSheet>(null);

    const openBottomSheet = (item: Flashcard) => {
        setSelectedCard(item);
        bottomSheetRef.current?.snapToIndex(1);
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close()
    }

    useFocusEffect(React.useCallback(() => {
        return () => closeBottomSheet;
    }, []));
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <FlatList
                data={flashcards}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id.toString()}
                style={styles.list}
                ListFooterComponent={<View style={{ height: 20 }} />} // Adds space below the list
                showsVerticalScrollIndicator={false}
            />
            <CardMoreOptions bottomSheetRef={bottomSheetRef} selectedCard={selectedCard} closeBottomSheet={closeBottomSheet}/>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingVertical: 15,
    }
});

export default CardList;