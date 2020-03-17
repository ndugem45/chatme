import React, {
  useState,
  useEffect
} from 'react';

import SettingComponent from '../Component/settingComponent';


export function SettingScreen({ navigation }) {
  return (
    <SettingComponent
      onTapProfile={() => navigation.navigate('Profile')}
      onTapNotification={() => navigation.navigate('Notification')}
    ></SettingComponent>
  );
}
