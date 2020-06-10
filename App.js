import React, {
  useState,
  useEffect
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';
import DeviceInfo from 'react-native-device-info';

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
import { myProfile, userData, chatData, blockList } from './Source/sample';

import { socketUrl } from './Source/util'

const Stack = createStackNavigator();

async function firstLoad(callback = () => { }) {
  // AsyncStorage.clear()
  console.log(`first load @ ${new Date()}. . .`)

  store.dispatch(actions('Socket', io(socketUrl)))

  var p = await AsyncStorage.getItem("MyProfile")
  store.dispatch(actions('MyProfile', p ? JSON.parse(p) : myProfile));

  var u = await AsyncStorage.getItem("UserData");
  store.dispatch(actions('UserData', u ? JSON.parse(u) : userData));

  var c = await AsyncStorage.getItem("ChatData");
  store.dispatch(actions('ChatData', c ? JSON.parse(c) : chatData));

  var n = await AsyncStorage.getItem("Notif");
  store.dispatch(actions('Notif', n ? JSON.parse(n) : true));

  // var b = await AsyncStorage.getItem("BlockList")
  store.dispatch(actions('BlockList', blockList));


    console.log(`. . . end first load @ ${new Date()}`)
  callback(true)
}


export default function App() {

  useEffect(() => {
    firstLoad(() => {
      store.subscribe(() => {
        AsyncStorage.setItem("MyProfile", JSON.stringify(store.getState().myProfile))
        AsyncStorage.setItem("UserData", JSON.stringify(store.getState().userData))
        AsyncStorage.setItem("ChatData", JSON.stringify(store.getState().chatData))
        AsyncStorage.setItem("Notif", JSON.stringify(store.getState().notifSetting))
        // AsyncStorage.setItem("BlockList", JSON.stringify(store.getState().blockList))
      })

      const socket = store.getState().socket

      socket.on('connect', () => {
        console.log('soc id', socket.id)
        socket.emit('active', socket.id, store.getState().myProfile.id);
      })

      socket.on('personalMessage', (user, msg) => {
        console.log('')
        console.log('user =', user)
        console.log('mess =', msg)
        console.log('')
        // const nData = contex.state.data;
        // nData.unshift({
        //     message: msg,
        //     time: Date.now(),
        //     me: false,
        //     margin: new Animated.Value(-40),
        //     opacity: new Animated.Value(0),
        //     reply: false
        // })
        // contex.setState({ data: nData })

        var old = [...store.getState().chatData]
        var index = store.getState().chatData.findIndex(x => x.id == user);
        var mess = {
          message: msg,
          time: Date.now(),
          me: false,
          reply: false
        }

        if (index > -1) {
          old[index].chat.push(mess)
        } else {
          // var n = contex.props.dataChat
          // n.chat = mess
          // n.muted = false
          // old.push(contex.props.dataChat)
        }

        store.dispatch(actions("ChatData", old))
      })
    })
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
