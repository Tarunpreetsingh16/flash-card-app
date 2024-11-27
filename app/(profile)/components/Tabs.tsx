
import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState } from 'react-native-tab-view';

const CardsRoute = () => (
    <View style={[styles.scene]}>
        <Text>First Tab Content</Text>
    </View>
);

const CategoriesRoute = () => (
    <View style={[styles.scene]}>
        <Text>Second Tab Content</Text>
    </View>
)

const CollectionRoute = () => (
    <View style={[styles.scene]}>
        <Text>Second Tab Content</Text>
    </View>
)



const renderScene = SceneMap({
    cardsRoute: CardsRoute,
    categoriesRoute: CategoriesRoute,
    collectionRoute: CollectionRoute
});

const routes = [
    { key: 'cardsRoute', title: 'Cards', icon: 'cog' },
    { key: 'categoriesRoute', title: 'Categories' },
    { key: 'collectionRoute', title: 'Collections' },
];

export default function TabViewExample() {
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
                    labelStyle={{ color: "grey" }}
                />
            )}

        />
    );
}

const styles = StyleSheet.create({
    // scene: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    tabBar: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    tabItem: {
        borderWidth: 1,
    },
    indicator: {
        backgroundColor: "white",
        height: 5,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    }
});