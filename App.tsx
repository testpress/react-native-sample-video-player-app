// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import MainScreen from './screens/MainScreen';
import PlayerScreen from './screens/PlayerScreen';
import DownloadListScreen from './screens/DownloadListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} options={{ title: 'Player' }} />
        <Stack.Screen name="DownloadListScreen" component={DownloadListScreen} options={{ title: 'Downloads' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
