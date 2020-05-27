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
    Image,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { DefaultText } from '../BaseComponent/defaultText';
import { constStyle, randColor } from '../BaseComponent/constStyle';
import store from '../Source/store';
import { avatar, backGender } from '../Source/avatar';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default class SettingComponent extends React.Component {

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <TouchableOpacity style={[styles.cardProfile]} onPress={() => this.props.onTapProfile()}>
                    <View style={[styles.photoWrapper]}>
                        <Image source={avatar[store.getState().myProfile.ava]} style={{ width: 70, height: 70 }} resizeMode={'cover'} />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', marginLeft: responsiveWidth(2) }}>
                        <DefaultText text={store.getState().myProfile.name} level={3} color='white' />
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: 'white', fontSize: responsiveFontSize(1.5) }}>
                            {store.getState().myProfile.greeting}
                        </Text>
                    </View>
                </TouchableOpacity>




                <TouchableOpacity style={[styles.menuSetting]}>
                    <Icon name="archive" size={responsiveFontSize(2.5)} color={constStyle.baseColor} />
                    <View style={{ flex: 1, marginHorizontal: responsiveHeight(1.5) }}>
                        <DefaultText text="Saved Message" level={2} />
                    </View>
                    <TouchableOpacity>
                        <Icon name="chevron-right" size={responsiveFontSize(2.5)} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuSetting]} onPress={() => this.props.onTapNotification()}>
                    <Icon name="bell" size={responsiveFontSize(2.5)} color={constStyle.baseColor} />
                    <View style={{ flex: 1, marginHorizontal: responsiveHeight(1.5) }}>
                        <DefaultText text="Notification" level={2} />
                    </View>
                    <TouchableOpacity>
                        <Icon name="chevron-right" size={responsiveFontSize(2.5)} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuSetting]} onPress={() => {
                    Alert.alert(
                        "ChatMe",
                        "Version 1.0.0",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                }}>
                    <Icon name="help" size={responsiveFontSize(2.5)} color={constStyle.baseColor} />
                    <View style={{ flex: 1, marginHorizontal: responsiveHeight(1.5) }}>
                        <DefaultText text="About" level={2} />
                    </View>
                    <TouchableOpacity>
                        <Icon name="chevron-right" size={responsiveFontSize(2.5)} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </SafeAreaView>
        )
    };
}


const styles = StyleSheet.create({
    cardProfile: {
        backgroundColor: constStyle.baseColor,
        padding: responsiveWidth(1) + responsiveHeight(1),
        marginVertical: responsiveHeight(3),
        marginHorizontal: responsiveWidth(4),
        borderRadius: responsiveWidth(1) + responsiveHeight(1),
        flexDirection: 'row',
    },
    photoWrapper: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        backgroundColor: store.getState().myProfile.gender == 1 ? backGender.male : backGender.female,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: store.getState().myProfile.gender == 1 ? backGender.male : backGender.female,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuSetting: {
        backgroundColor: 'aliceblue',
        padding: responsiveWidth(1) + responsiveHeight(1),
        flexDirection: 'row',
        marginBottom: responsiveHeight(1),
        alignItems:'center'
    }
});
