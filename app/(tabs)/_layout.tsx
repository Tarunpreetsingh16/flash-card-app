import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addCard"
        options={{
          title: 'Add Card',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}