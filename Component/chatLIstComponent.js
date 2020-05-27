import React from 'react';
import {
    SafeAreaView,
    ActivityIndicator,
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
import { constStyle, randColor } from '../BaseComponent/constStyle';
import store from '../Source/store';
import actions from '../Source/actions';
import { avatar, backGender } from '../Source/avatar';
import { timeAgo } from '../Source/util'
import ActionSheet from 'react-native-action-sheet';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Moment from 'react-moment';



function listItem(data, props, longPress, avaTap) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }} onPress={() => props(data.item)} onLongPress={() => longPress()}>
            <View style={[styles.onlineIndicator, { backgroundColor: data.item.online ? 'limegreen' : 'lightgrey' }]}></View>
            <TouchableOpacity style={[styles.avaWrapper, { backgroundColor: data.item.gender == 1 ? backGender.male : backGender.female, borderColor: data.item.gender == 1 ? backGender.male : backGender.female }]} onPress={() => avaTap()}>
                <Image source={avatar[data.item.ava]} style={{ width: 50, height: 50 }} resizeMode={'cover'} />
            </TouchableOpacity>

            <View style={styles.contentWrapper}>
                <View style={{ flex: 2 }}>
                    <DefaultText text={data.item.name} level={2} />
                    <Text style={{ color: 'darkgrey', fontSize: responsiveFontSize(1.5) }} numberOfLines={2}>
                        {data.item.chat.length ? data.item.chat[0].message : ''}
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                    {/* <DefaultText text={data.item.chat.length ? timeAgo(data.item.chat[0].time) : ''} level={0} /> */}

                    <Moment unix element={Text} format={timeAgo(data.item.chat[0].time).state == 'last' ? "DD MMMM yyyy" : "HH:mm"}>
                        {timeAgo(data.item.chat[0].time).time}
                    </Moment>

                    <Text>
                        {data.item.muted ? <Icon name="sound-mute" size={responsiveFontSize(1.5)} color='dimgrey' /> : null}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}


export default class ChatListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatData: [],
            load: true
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ chatData: store.getState().chatData })
            this.setState({ load: false })
            this.unsub = store.subscribe(() => {
                this.setState({ chatData: store.getState().chatData })
            })
        }, 500)
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

    _sortList() {
        return this.state.chatData.sort(function (a, b) {
            return parseInt(b.chat.length ? b.chat[0].time : 0) - parseInt(a.chat.length ? a.chat[0].time : 0)
        });
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>

                {this.state.load ?
                    <ActivityIndicator size="large" color={constStyle.baseColor} style={{ marginTop: 20 }} />
                    : null
                }

                <FlatList
                    data={this._sortList()}
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
        marginHorizontal: responsiveWidth(3),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(2),
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
        marginLeft: responsiveWidth(2.5),
        borderBottomWidth: 1,
        borderBottomColor: 'whitesmoke',
        paddingBottom: 10,
        flexDirection: 'row'
    }
});
