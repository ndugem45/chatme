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
    TouchableOpacity
} from 'react-native';
import { DefaultText } from '../BaseComponent/defaultText';

function listItem(data, props) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }} onPress={() => props(data.item)}>
            <View style={styles.avaWrapper}>
                <View style={[styles.onlineIndicator, { backgroundColor: data.item.online ? 'limegreen' : 'lightgrey' }]}></View>
            </View>
            <View style={styles.contentWrapper}>
                <View style={{ flex: 1 }}>
                    <DefaultText text={data.item.name} level={2} />
                    <DefaultText text={data.item.message} level={0} state="deactive" />
                </View>
                <DefaultText text={data.item.time} level={0} />
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
        const data = [
            {
                id: 1,
                name: 'Bayu',
                message: 'Hey, ayo pergi !',
                time: '2m',
                online: true
            },
            {
                id: 2,
                name: 'Ayana',
                message: 'Aku sudah mengerti',
                time: '1m',
                online: false
            },
            {
                id: 3,
                name: 'Pak Bejo',
                message: 'Sudah saya tunggu loh angsuran nya',
                time: '2h',
                online: false
            }
        ]
        return (
            <SafeAreaView style={{backgroundColor:'white',flex:1}}>
                <FlatList
                    data={data}
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
        backgroundColor: 'darkgrey',
        borderRadius: 50 / 2
    },
    onlineIndicator: {
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        borderWidth: 1,
        borderColor: 'whitesmoke'
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
