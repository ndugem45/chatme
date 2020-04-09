import React, {
  useState,
  useEffect
} from 'react';

import ChatListComponent from '../Component/chatLIstComponent';
import store from '../Source/store';
import actions from '../Source/actions';


function onItemTap(nav, item) {
  nav.navigate('ChatRoom', { item: item })
}

export function ChatListScreen({ navigation }) {
  return (
    <ChatListComponent onItemTap={(item) => onItemTap(navigation, item)} ></ChatListComponent>
  );
}
