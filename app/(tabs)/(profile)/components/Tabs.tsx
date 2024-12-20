
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Categories from './Tabs/Categories';
import Cards from './Tabs/Cards';
import React from 'react';

const CardsRoute = () => (
    <Cards />
);

const CategoriesRoute = () => (
    <Categories />
);

const renderScene = SceneMap({
    cardsRoute: CardsRoute,
    categoriesRoute: CategoriesRoute,
});

const routes = [
    { key: 'cardsRoute', title: 'Cards' },
    { key: 'categoriesRoute', title: 'Categories' },
];

export default function Tabs() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    style={[styles.tabBar]} // Tab bar background color
                    indicatorStyle={[styles.indicator]} // Active tab indicator color
                />
            )}

        />
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#5F7470'
    },
    indicator: {
        backgroundColor: "white",
        height: 5,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});