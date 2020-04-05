import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { DefaultText } from '../BaseComponent/defaultText';
import { randColor } from '../BaseComponent/constStyle';
import { chatData } from '../Source/sample';
import { avatar } from '../Source/avatar';

function listItem(data, props) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }} onPress={() => props(data.item)}>
            <View style={[styles.onlineIndicator, { backgroundColor: data.item.online ? 'limegreen' : 'lightgrey' }]}></View>
            <View style={[styles.avaWrapper]}>
                <Image source={avatar[data.item.ava]} style={{ width: 50, height: 50 }} resizeMode={'cover'} />
            </View>

            <View style={styles.contentWrapper}>
                <View style={{ flex: 1 }}>
                    <DefaultText text={data.item.name} level={2} />
                    <Text style={{ color: 'darkgrey', fontSize: 13 }} numberOfLines={2}>
                        {data.item.chat[data.item.chat.length - 1].message}
                    </Text>
                </View>
                <DefaultText text={data.item.chat[data.item.chat.length - 1].time} level={0} />
            </View>
        </TouchableOpacity>
    )
}

function listSeparator() {
    return (
        <View style={{ marginVertical: 10 }}></View>
    )
}

export default class ChatListComponent extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <FlatList
                    data={chatData}
                    renderItem={item => listItem(item, this.props.onItemTap)}
                    style={styles.flatlistStyle}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        )
    };
}


const styles = StyleSheet.create({
    flatlistStyle: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    avaWrapper: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'aliceblue',
        overflow: "hidden",
        borderWidth: 2,
        borderColor: 'aliceblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    onlineIndicator: {
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        borderWidth: 1,
        top: 7,
        left: 12,
        zIndex: 2,
        borderColor: 'whitesmoke',
        position: 'absolute'
    },
    contentWrapper: {
        flex: 1,
        marginLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingBottom: 10,
        flexDirection: 'row'
    }
});
