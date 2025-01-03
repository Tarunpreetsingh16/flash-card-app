import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper'
import FeedRoute from './feed';
import SearchStackLayout from './(search)/_layout';
import Search from './(search)';
import AddCard from './addCard';
import ProfileScreen from './(profile)';

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'feed', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'search', title: 'Search', focusedIcon: 'card-search', unfocusedIcon: 'card-search-outline' },
    { key: 'add', title: 'Add', focusedIcon: 'plus-box', unfocusedIcon: 'plus-box-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: FeedRoute,
    search: Search,
    add: AddCard,
    profile: ProfileScreen
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;