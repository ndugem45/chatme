import React, {
    useState,
    useEffect
} from 'react';

import ChatRoomComponent from '../Component/chatRoomComponent';

function profile(data, navigation) {
    navigation.navigate('Profile', { item: data })
}

export function ChatRoomScreen({ route, navigation }) {
    // console.log(route.params.item)
    return (
        <ChatRoomComponent dataChat={route.params.item} gotoProfile={() => profile(route.params.item, navigation)} navi={navigation}></ChatRoomComponent>
    );
}
