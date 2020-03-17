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
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { DefaultText } from '../BaseComponent/defaultText';
import { constStyle } from '../BaseComponent/constStyle';



function chatItem(data) {
    return (
        <View style={[{ justifyContent: data.item.me ? 'flex-end' : 'flex-start' }, styles.chatContainer]}>
            <View style={[{ backgroundColor: data.item.me ? constStyle.baseColor : 'whitesmoke' }, styles.itemWrapper]}>
                <DefaultText text={data.item.message} level={1} color={data.item.me ? 'white' : ''} />
                <DefaultText text={data.item.time} smallText={true} state="deactive" align={data.item.me ? 'right' : 'left'} color={data.item.me ? 'white' : ''} />
            </View>
        </View>
    )
}

export default class ChatListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: '',
            data: [],
        }
    }

    componentDidMount() {
        this._loadData()
    }

    _loadData() {
        const data = [
            {
                id: 1,
                message: 'Hey, jadi engga',
                time: '2m',
                me: false
            },
            {
                id: 2,
                message: 'Jadi kemana ?',
                time: '1m',
                me: true
            },
            {
                id: 3,
                message: 'Ke tempat indah, acara ultah',
                time: '1m',
                me: false
            },
            {
                id: 4,
                message: 'Kuy, mandi dulu',
                time: '30s',
                me: true
            },
            {
                id: 5,
                message: 'Cepetan !!',
                time: 'now',
                me: false
            }
        ]
        setTimeout(() => {
            this.setState({ data: data })
        }, 500)
    }

    _sendChat() {
        const nData = this.state.data;
        nData.push({
            id: Math.floor(this.state.data[this.state.data.length - 1].id + 1),
            message: this.state.chat,
            time: 'now',
            me: true
        })
        this.setState({ chat: '' })
        this.setState({ data: nData })
    }


    render() {

        return (
            <SafeAreaView style={{ height: '100%' }}>

                <FlatList
                    data={this.state.data}
                    renderItem={(item) => chatItem(item)}
                />
                <View style={[styles.textBoxContainer, constStyle.shadow.depth2]}>
                    <TextInput style={[styles.textBox]} placeholder="Type something..." placeholderTextColor='grey' multiline={true} value={this.state.chat} onChangeText={text => this.setState({ chat: text })} />
                    <TouchableOpacity style={[styles.sendBtn]} onPress={() => this._sendChat()}>
                        <Icon name="paper-plane" size={25} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    };
}


const styles = StyleSheet.create({
    chatContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    itemWrapper: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    textBoxContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: 400,
        borderRadius: 50 / 2,
        paddingVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 5
    },
    textBox: {
        flex: 1,
        marginRight: 10,
        height: 40
    },
    sendBtn: {
        width: 25,
        height: 25
    }
});
