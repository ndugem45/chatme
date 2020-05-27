import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    FlatList,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { DefaultText } from '../BaseComponent/defaultText';
import { constStyle } from '../BaseComponent/constStyle';
import store from '../Source/store';
import actions from '../Source/actions';
import { timeAgo } from '../Source/util';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Moment from 'react-moment';



function chatItem(data, optFunc, replyFunc, moveToMsg, itemHeight) {
    return (
        <View style={[{ justifyContent: data.me ? 'flex-end' : 'flex-start' }, styles.chatContainer]} onLayout={object => itemHeight(object.nativeEvent.layout.height)}>
            {data.me ? null :
                <Animated.View style={{ width: 40, marginRight: data.margin, flexDirection: 'row', opacity: data.opacity, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => replyFunc(data)}>
                        <Text style={{ color: constStyle.baseColor }}>
                            Reply
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            }
            <TouchableWithoutFeedback onPress={() => optFunc(data)} style={{ zIndex: 2 }}>
                <View style={[{ backgroundColor: data.me ? constStyle.baseColor : 'whitesmoke' }, styles.itemWrapper]}>
                    {data.reply ?
                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', padding: 5, borderRadius: 5 }} onPress={() => moveToMsg(data)}>
                            <Text style={{ fontSize: 13, color: 'grey' }}>
                                {data.reply.message}
                            </Text>
                            {/* <DefaultText text={timeAgo(data.reply.time)} smallText={true} color='grey' /> */}
                            <Moment unix element={Text} format={timeAgo(data.reply.time).state == 'last' ? "DD MMMM yyyy" : "HH:mm"} style={{ color: 'grey', fontSize: responsiveFontSize(1.3) }}>
                                {timeAgo(data.reply.time).time}
                            </Moment>
                        </TouchableOpacity>
                        : null}

                    <DefaultText text={data.message} level={1} color={data.me ? 'white' : ''} />
                    {/* <DefaultText text={timeAgo(data.time)} smallText={true} state="deactive" align={data.me ? 'right' : 'left'} color={data.me ? 'white' : ''} /> */}
                    <Moment unix element={Text} format={timeAgo(data.time).state == 'last' ? "DD MMMM yyyy" : "HH:mm"} style={{ color: data.me ? 'white' : 'grey', fontSize: responsiveFontSize(1.3) }}>
                        {timeAgo(data.time).time}
                    </Moment>
                </View>
            </TouchableWithoutFeedback>
            {data.me ?
                <Animated.View style={{ width: 40, marginLeft: data.margin, flexDirection: 'row', opacity: data.opacity, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => replyFunc(data)}>
                        <Text style={{ color: constStyle.baseColor }}>
                            Reply
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
                : null}
        </View>
    )
}


export default class ChatListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatIndex: -1,
            chat: '',
            data: [],
            load: true,
            optData: null,
            replyData: null,
            replyDialog: {
                opacity: new Animated.Value(1)
            },
            optChat: store.getState().optChat
        }
        this.itemHeight = []
    }


    componentDidMount() {
        const contex = this;
        this._loadData()

        this.unsubscribe = store.subscribe(() => {
            var index = store.getState().chatData.findIndex(x => x.id == this.props.dataChat.id);
            if (index > -1 && !store.getState().chatData[index].chat.length) {
                this._loadData()
            }
        })
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                if (contex.state.optData != null) {
                    this._showOptAnim(false, this.state.optData)
                    return true;
                }
            }
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.unsubscribe()
    }





    _loadData() {
        var index = store.getState().chatData.findIndex(x => x.id == this.props.dataChat.id);
        setTimeout(() => {
            if (index > -1) {
                this._fillAnimValue(store.getState().chatData[index].chat, (arr) => {
                    this.setState({ data: arr, load: false, chatIndex: index })
                })
            } else {
                this.setState({ load: false })
            }
        }, 200)
    }

    _fillAnimValue(arr, callback) {
        var newArr = [];
        arr.forEach((s) => {
            s.margin = new Animated.Value(-40);
            s.opacity = new Animated.Value(0);
            newArr.push(s)
        })
        callback(newArr)
    }

    _sendChat() {
        if (this.state.chat.length) {
            const nData = this.state.data;
            nData.unshift({
                message: this.state.chat,
                time: Date.now(),
                me: true,
                margin: new Animated.Value(-40),
                opacity: new Animated.Value(0),
                reply: this.state.replyData ? this.state.replyData : false
            })
            store.getState().socket.emit('sendMessage', store.getState().myProfile.id, this.props.dataChat.id, this.state.chat)
            this.setState({ data: nData })
            this.setState({ replyData: null })
            this._showOptAnim(false, this.state.optData)
            this.setState({ chat: '' })



            var old = [...store.getState().chatData]
            if (this.state.chatIndex < 0) {
                var n = this.props.dataChat
                n.chat = this.state.data
                n.muted = false
                old.push(this.props.dataChat)
            } else {
                old[this.state.chatIndex].chat = this.state.data
            }

            store.dispatch(actions("ChatData", old))
            this.setState({ chatIndex: store.getState().chatData.findIndex(x => x.id == this.props.dataChat.id) })
            this.flatList.scrollToIndex({ animated: true, index: 0 })
        }
    }

    _showOptAnim(state, data) {
        if (state) {
            Animated.sequence([
                Animated.timing(data.opacity, {
                    toValue: 1,
                    duration: 5
                }),
                Animated.timing(data.margin, {
                    toValue: 0,
                    duration: 200
                })
            ]).start();
            setTimeout(() => {
                this.setState({ optData: data })
            }, 200)
        } else if (data) {
            Animated.parallel([
                Animated.timing(data.margin, {
                    toValue: -40,
                    duration: 100
                }),
                Animated.timing(data.opacity, {
                    toValue: 0,
                    duration: 100
                })
            ]).start();
            setTimeout(() => {
                this.setState({ optData: null })
            }, 100)

        }

    }

    _optMsg(data) {
        if (this.state.optData != null) {
            this._showOptAnim(false, this.state.optData.id == data.id ? data : this.state.optData)
            if (this.state.optData.id != data.id) {
                this._showOptAnim(true, data)
            }
        } else {
            this._showOptAnim(true, data)
        }
    }

    _reply(data) {
        this.setState({ replyData: data })
        this._showOptAnim(false, this.state.optData)
        Animated.parallel([
            Animated.timing(this.state.replyDialog.opacity, {
                toValue: 1,
                duration: 100
            })
        ]).start();
    }

    _moveToMsg(data) {
        var index = this.state.data.findIndex(x => x.id == data.reply.id);
        if (index > -1) {
            this.flatList.scrollToIndex({ animated: true, index: index })
        }
    }

    _getItemLayout = (data, index) => {
        var length = this.itemHeight[index] ? this.itemHeight[index] : 58
        var offset = length * index
        return (
            { length: length, offset: offset, index }
        )
    }


    render() {

        return (
            <SafeAreaView style={{ height: '100%' }}>

                {this.state.load ?
                    <ActivityIndicator size="large" color={constStyle.baseColor} style={{ marginTop: 20 }} />
                    : null
                }

                <FlatList
                    ref={(ref) => { this.flatList = ref; }}
                    data={this.state.data}
                    inverted={true}
                    renderItem={(dt) => chatItem(dt.item, (data) => this._optMsg(data), (data) => this._reply(data), (data) => this._moveToMsg(data), (height) => {
                        this.itemHeight[dt.index] = Math.round(height)
                    })}
                    keyExtractor={(item, index) => index}
                    getItemLayout={this._getItemLayout}
                />

                <View style={[styles.textBoxContainer, constStyle.shadow.depth2]}>
                    {this.state.replyData ?
                        <Animated.View style={[{ backgroundColor: 'whitesmoke', padding: 10, width: '100%', borderRadius: 50 / 2, opacity: this.state.replyDialog.opacity, flexDirection: 'row', marginBottom: 5 }]}>
                            <Text style={{ color: 'grey', fontSize: 14, flex: 1 }} numberOfLines={3}>
                                {this.state.replyData.message}
                            </Text>
                            <TouchableOpacity style={[styles.sendBtn]} onPress={() => { this.setState({ replyData: null }) }}>
                                <Icon name="cross" size={20} color="dimgrey" />
                            </TouchableOpacity>
                        </Animated.View>
                        : null}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput style={[styles.textBox]} placeholder="Type something..." placeholderTextColor='grey' multiline={true} value={this.state.chat} onFocus={() => this._showOptAnim(false, this.state.optData)} onChangeText={text => this.setState({ chat: text })} />
                        <TouchableOpacity style={[styles.sendBtn]} onPress={() => this._sendChat()}>
                            <Icon name="paper-plane" size={25} color={constStyle.baseColor} />
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        )
    };
}


const styles = StyleSheet.create({
    chatContainer: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1)
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
        marginHorizontal: responsiveWidth(3),
        borderRadius: responsiveWidth(20),
        paddingVertical: responsiveHeight(0.3),
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5.5),
        marginVertical: responsiveHeight(1)
    },
    textBox: {
        flex: 1,
        marginRight: 10,
        minHeight: responsiveHeight(5),
        maxHeight: responsiveHeight(10)
    },
    sendBtn: {
        width: 25,
        height: 25
    }
});
