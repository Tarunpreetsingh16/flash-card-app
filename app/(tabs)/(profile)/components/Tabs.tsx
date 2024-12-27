
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Categories from './Tabs/Categories';
import Cards from './Tabs/Cards';
import React, { useMemo } from 'react';
import { SegmentedButtons } from 'react-native-paper';

type Route = {
    value: string,
    scene: React.ReactNode
}

const routes = new Map<string, Route>([
    ['cards', { value: 'cards', scene: <Cards /> }],
    ['categories', { value: 'categories', scene: <Categories /> }],
]);

export default function Tabs() {
    const [value, setValue] = React.useState('cards');
    const scene = useMemo(() => {
        const route = routes.get(value);
        return route?.scene;
    }, [value]);

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                style={styles.tabBar}
                buttons={[
                    {
                        value: 'cards',
                        label: 'Cards',
                        checkedColor: 'white',
                        style: value === 'cards' && styles.selectedButton
                    },
                    {
                        value: 'categories',
                        label: 'Categories',
                        checkedColor: 'white',
                        style: value === 'categories' && styles.selectedButton
                    },
                ]}
            />
            <View style={styles.scene}>
                {scene}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        width: '80%',
        alignSelf: 'center',
    },
    indicator: {
        backgroundColor: "white",
        height: 5,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    container: {
        flex: 1,
    },
    selectedButton: {
        backgroundColor: '#5F7470',
    },
    scene: {
        marginVertical: 5,
    }
});