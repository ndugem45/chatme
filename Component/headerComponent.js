import React from 'react';
import {
    Text,
    StatusBar,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { DefaultText } from '../BaseComponent/defaultText';
import { constStyle } from '../BaseComponent/constStyle';
import ActionSheet from 'react-native-action-sheet';
import store from '../Source/store';
import actions from '../Source/actions';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

const fontScale = store.getState().fontScale


export function HeaderComponent({ scene, previous, navigation }) {


    return (
        <View style={[styles.headerContainer, constStyle.shadow.depth3]}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="flower" size={responsiveFontSize(3.0)} color={constStyle.baseColor} style={{ marginRight: 5 }} />
                <DefaultText text='ChatMe' level={1} color={constStyle.baseColor} />
            </View>
        </View>
    );
}

function _optChat(option, navi, optIndex) {
    switch (parseInt(optIndex)) {
        case 0:
            navi.navigate("Profile", { item: option.params.item })
            break;
        case 1:
            var index = store.getState().chatData.findIndex(x => x.id == option.params.item.id)
            if (index > -1) {
                var old = [...store.getState().chatData]
                old[index].chat = []
                store.dispatch(actions("ChatData", old))
            }
            break;
        case 2:
            var index = store.getState().chatData.findIndex(x => x.id == option.params.item.id)
            var old = [...store.getState().blockList]
            old.push({
                id: option.params.item.id,
                name: option.params.item.name,
                ava: option.params.item.ava,
                gender: option.params.item.gender
            })
            store.dispatch(actions("BlockList", old))

            if (index > -1) {
                old = [...store.getState().chatData]
                old.splice(index, 1)
                store.dispatch(actions("ChatData", old))
                navi.goBack()
            }
            break;
    }
}

export function HeaderComponentChat({ scene, previous, navigation }) {
    const option = scene.route
    return (
        <View style={[styles.headerContainer, constStyle.shadow.depth3]}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />

            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: responsiveWidth(5) }}>
                <View style={[styles.headerItemWrapper]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="chevron-left" size={responsiveFontSize(3.0)} color={constStyle.baseColor} />
                        <View>
                            <DefaultText text={option.params.item.name} level={1} color={constStyle.baseColor} />
                            {option.params.item.online ? <DefaultText text={'Online'} smallText={true} color={'grey'} /> : null}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.headerItemWrapper, { alignItems: 'flex-end' }]}>
                    <TouchableOpacity onPress={() => {

                        var BtnOptChat = [
                            'Profile',
                            'Delete all message',
                            'Block person'
                        ];

                        var DESTRUCTIVE_INDEX = 3;
                        var CANCEL_INDEX = 4;

                        ActionSheet.showActionSheetWithOptions({
                            options: BtnOptChat,
                            cancelButtonIndex: CANCEL_INDEX,
                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            tintColor: 'blue'
                        },
                            (buttonIndex) => {
                                _optChat(option, navigation, buttonIndex)
                            });
                    }}>
                        <Icon name="dots-three-vertical" size={20 * fontScale} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

export function HeaderComponentBack({ scene, previous, navigation }) {
    const option = scene.route

    return (
        <View style={[styles.headerContainer, constStyle.shadow.depth3]}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />

            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: responsiveWidth(5) }}>
                <View style={[styles.headerItemWrapper]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="chevron-left" size={responsiveFontSize(3.0)} color={constStyle.baseColor} />
                        {/* <DefaultText text='Back' level={1} color={constStyle.baseColor} /> */}
                    </TouchableOpacity>
                </View>
                {/* <View style={[styles.headerItemWrapper, { alignItems: 'flex-end' }]}>
                    <TouchableOpacity>
                        <Icon name="dots-three-vertical" size={20} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </View> */}
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        height: responsiveHeight(10),
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: responsiveHeight(3.5)
    },
    headerItemWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
});
