import React, {
  useState,
  useEffect
} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TabNavigation } from './Screen/tabNavigation';
import { ChatRoomScreen } from './Screen/chatRoomScreen';
import { NewChatScreen } from './Screen/newChatScreen';
import { ProfileScreen } from './Screen/profileScreen';
import { NotificationScreen } from './Screen/notificationScreen';

import { HeaderComponent, HeaderComponentBasic, HeaderComponentBack } from './Component/headerComponent';

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNav">
        <Stack.Screen
          name="TabNav"
          component={TabNavigation}
          options={{
            header: ({ scene, previous, navigation }) => HeaderComponent({ scene, previous, navigation }),
            cardStyle: { backgroundColor: 'white' }
          }} />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoomScreen}
          options={{
            header: ({ scene, previous, navigation }) => HeaderComponentBasic({ scene, previous, navigation }),
            cardStyle: { backgroundColor: 'white' }
          }} />
        <Stack.Screen
          name="NewChat"
          component={NewChatScreen}
          options={{
            header: ({ scene, previous, navigation }) => HeaderComponentBack({ scene, previous, navigation }),
            cardStyle: { backgroundColor: 'white' }
          }} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            header: ({ scene, previous, navigation }) => HeaderComponentBack({ scene, previous, navigation }),
            cardStyle: { backgroundColor: 'white' }
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
