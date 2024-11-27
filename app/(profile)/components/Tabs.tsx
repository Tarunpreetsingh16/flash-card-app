
import * as React from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={[ { backgroundColor: "#ff4081" }]}>
        <Text>First Tab Content</Text>
        <Text>First Tab Content</Text>
        <Text>First Tab Content</Text>
        <Text>First Tab Content</Text>
        <Text>First Tab Content</Text>
    </View>
);

const SecondRoute = () => (
    <View style={[{ backgroundColor: "#673ab7" }]}>
        <Text>Second Tab Content</Text>
    </View>
)



const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const routes = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
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
    />
  );
}