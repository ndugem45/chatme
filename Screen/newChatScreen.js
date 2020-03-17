import React, {
    useState,
    useEffect
  } from 'react';
  
  import NewChatComponent from '../Component/newChatComponent';
  
  
  function onItemTap(nav, item) {
    nav.navigate('ChatRoom',{ item: item })
  }
  
  export function NewChatScreen({ navigation }) {
    return (
      <NewChatComponent onItemTap={(item) => onItemTap(navigation, item)} ></NewChatComponent>
    );
  }
  