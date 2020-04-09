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

import { HeaderComponent, HeaderComponentChat, HeaderComponentBack } from './Component/headerComponent';

import store from './Source/store';
import actions from './Source/actions';
import { myProfile, userData, chatData } from './Source/sample';

const Stack = createStackNavigator();



export default function App() {

  useEffect(() => {
    console.log("first load . . .")
    store.dispatch(actions('MyProfile', myProfile));
    store.dispatch(actions('UserData', userData));
    store.dispatch(actions('ChatData', chatData));
    console.log(". . . end first load")
  });

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
            header: ({ scene, previous, navigation }) => HeaderComponentChat({ scene, previous, navigation }),
            cardStyle: { backgroundColor: 'white' }
          }} />
        <Stack.Screen
          name="NewChat"
          component={NewChatScreen}
          options={{
            headerShown: false
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
