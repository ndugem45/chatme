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
import Icon from 'react-native-vector-icons/Entypo';
import { DefaultText } from '../BaseComponent/defaultText';
import { randColor } from '../BaseComponent/constStyle';
import store from '../Source/store';
import actions from '../Source/actions';
import { avatar, backGender } from '../Source/avatar';
import { timeAgo } from '../Source/util'
import ActionSheet from 'react-native-action-sheet';



function listItem(data, props, longPress, avaTap) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }} onPress={() => props(data.item)} onLongPress={() => longPress()}>
            <View style={[styles.onlineIndicator, { backgroundColor: data.item.online ? 'limegreen' : 'lightgrey' }]}></View>
            <TouchableOpacity style={[styles.avaWrapper, { backgroundColor: data.item.gender == 1 ? backGender.male : backGender.female, borderColor: data.item.gender == 1 ? backGender.male : backGender.female }]} onPress={() => avaTap()}>
                <Image source={avatar[data.item.ava]} style={{ width: 50, height: 50 }} resizeMode={'cover'} />
            </TouchableOpacity>

            <View style={styles.contentWrapper}>
                <View style={{ flex: 1 }}>
                    <DefaultText text={data.item.name} level={2} />
                    <Text style={{ color: 'darkgrey', fontSize: 13 }} numberOfLines={2}>
                        {data.item.chat.length ? data.item.chat[0].message : ''}
                    </Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <DefaultText text={data.item.chat.length ? timeAgo(data.item.chat[0].time) : ''} level={0} />
                    <Text>
                        {data.item.muted ? <Icon name="sound-mute" size={15} color='dimgrey' /> : null}
                    </Text>
                </View>

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
    constructor(props) {
        super(props)
        this.state = {
            chatData: []
        }
    }
    componentDidMount() {
        this.setState({ chatData: store.getState().chatData })
        store.subscribe(() => {
            this.setState({ chatData: store.getState().chatData })
        })
    }

    _optList(data) {
        var index = store.getState().chatData.findIndex(x => x.id == data.id)
        var BtnOptChat = [
            store.getState().chatData[index].muted ? 'Unmute chat' : 'Mute chat',
            'Delete chat'
        ];
        var DESTRUCTIVE_INDEX = 3;
        var CANCEL_INDEX = 4;
        var contex = this;

        ActionSheet.showActionSheetWithOptions({
            options: BtnOptChat,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: 'blue'
        },
            (buttonIndex) => {

                if (buttonIndex == 0) {
                    var old = [...store.getState().chatData]
                    old[index].muted = !old[index].muted
                    store.dispatch(actions("ChatData", old))
                } else if (buttonIndex == 1) {
                    var old = [...store.getState().chatData]
                    old.splice(index, 1);
                    store.dispatch(actions("ChatData", old))
                }
            });
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <FlatList
                    data={this.state.chatData}
                    renderItem={item => listItem(item, this.props.onItemTap, () => this._optList(item.item), () => { this.props.navi.navigate("Profile", { item: item.item }) })}
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
        overflow: "hidden",
        borderWidth: 2,
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
