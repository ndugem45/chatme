import React from 'react';
import {
    Text,
    StatusBar,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { DefaultText } from '../BaseComponent/defaultText';
import { constStyle } from '../BaseComponent/constStyle';



export function TabBarComponent({ state, descriptors, navigation }) {
    return (
        <View style={[styles.tabContainer, constStyle.shadow.depth4]}>
            <TouchableOpacity onPress={() => navigation.navigate('ChatList')} style={[styles.tabItem]}>
                <Icon name="chat" size={25} color={state.index == 0 ? constStyle.baseColor : 'darkgrey'} />
                <DefaultText text="Chat" level={0} state={state.index == 0 ? 'active' : 'deactive'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabItem]} onPress={() => navigation.navigate('NewChat')}>
                <View style={{ backgroundColor: constStyle.baseColor, width: 60, height: 60, borderRadius: 60 / 2, justifyContent: 'center', alignItems: 'center', bottom: 10 }}>
                    <Icon name="plus" size={30} color='white' />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Setting')} style={[styles.tabItem]}>
                <Icon name="tools" size={25} color={state.index == 1 ? constStyle.baseColor : 'darkgrey'} />
                <DefaultText text="Setting" level={0} state={state.index == 1 ? 'active' : 'deactive'} />
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: 'white',
        height: 50,
        flexDirection: 'row'
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
