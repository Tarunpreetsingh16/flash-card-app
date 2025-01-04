import * as React from 'react';
import { BottomNavigation, TouchableRipple } from 'react-native-paper'
import FeedScreen from './feed';
import Search from './(search)';
import ProfileScreen from './(profile)';
import MoreScreen from './more';
import AddCardScreen from './addCard';


const MyComponent = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'feed', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'search', title: 'Search', focusedIcon: 'card-search', unfocusedIcon: 'card-search-outline' },
        { key: 'add', title: 'Add', focusedIcon: 'plus-box', unfocusedIcon: 'plus-box-outline' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account' },
        { key: 'more', title: 'More', focusedIcon: 'more', unfocusedIcon: 'dots-horizontal' },
    ]);

    const AddRoute = () => {
        return <AddCardScreen routeToFeedScreen={() => setIndex(0)} />;
    }
    const renderScene = BottomNavigation.SceneMap({
        feed: FeedScreen,
        search: Search,
        add: AddRoute,
        profile: ProfileScreen,
        more: MoreScreen
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            renderTouchable={({ key, ...props }) => <TouchableRipple key={key} {...props} />}
        />
    );
};

export default MyComponent;