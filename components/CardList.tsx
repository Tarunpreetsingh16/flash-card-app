import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Flashcard } from '@/data/FlashCard';
import CardView from '@/components/CardView';

interface CardListProps {
    flashcards: Flashcard[] | null
}

const CardList = (props: CardListProps) => {
    const flashcards = props.flashcards;

    const renderItem = ({ item }: { item: Flashcard }) => (
        <CardView flashCard={item} />
    );

    return (
        <FlatList
            data={flashcards}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            ListFooterComponent={<View style={{ height: 20 }} />} // Adds space below the list
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});

export default CardList;