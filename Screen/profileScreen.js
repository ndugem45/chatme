import React, {
    useState,
    useEffect
} from 'react';

import ProfileComponent from '../Component/profileComponent';
import store from '../Source/store';


function onBackTap(nav) {
    nav.goBack()
}

function profileData(route) {
    return route.params ? route.params.item : store.getState().myProfile
}

function onChat(nav, item) {
    console.log(item)
    nav.navigate('ChatRoom',{ item: item })
}

export function ProfileScreen({ route, navigation }) {
    return (
        <ProfileComponent onBackTap={() => onBackTap(navigation)} userData={() => profileData(route)} onChatPress={(item) => onChat(navigation, item)}></ProfileComponent>
    );
}
