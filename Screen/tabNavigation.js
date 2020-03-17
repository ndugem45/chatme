import React, {
    useState,
    useEffect
} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabBarComponent } from '../Component/tabBarComponent';

import { ChatListScreen } from './chatListScreen';
import { SettingScreen } from './settingScreen';


const Tab = createBottomTabNavigator();



export function TabNavigation({ navigation }) {
    return (
        <Tab.Navigator tabBar={props => <TabBarComponent {...props} />}>
            <Tab.Screen name="ChatList" component={ChatListScreen} />
            <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>
    );
}
