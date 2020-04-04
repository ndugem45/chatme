import React, {
    useState,
    useEffect
} from 'react';

import ChatRoomComponent from '../Component/chatRoomComponent';



export function ChatRoomScreen({ route, navigation }) {
    // console.log(route.params.item)
    return (
        <ChatRoomComponent dataChat={route.params.item}></ChatRoomComponent>
    );
}
