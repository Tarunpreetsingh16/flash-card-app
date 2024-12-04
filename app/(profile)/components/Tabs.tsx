
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import Cards from './Tabs/Cards';

const CardsRoute = () => (
    <Cards />
);

const CategoriesRoute = () => (
    <View style={[styles.scene]}>
        <Text>Second Tab Content</Text>
    </View>
)

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