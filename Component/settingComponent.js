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

export default class SettingComponent extends React.Component {

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <TouchableOpacity style={{ backgroundColor: constStyle.baseColor, padding: 10, marginTop: 30, marginHorizontal: 10, borderRadius: 10, flexDirection: 'row', marginBottom: 20 }} onPress={() => this.props.onTapProfile()}>
                    <View style={{ width: 70, height: 70, borderRadius: 70 / 2, backgroundColor: store.getState().myProfile.gender == 1 ? backGender.male : backGender.female, overflow: "hidden", borderWidth: 2, borderColor: store.getState().myProfile.gender == 1 ? backGender.male : backGender.female, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={avatar[store.getState().myProfile.ava]} style={{ width: 70, height: 70 }} resizeMode={'cover'} />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                        <DefaultText text={store.getState().myProfile.name} level={3} color='white' />
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: 'white', fontSize: 12 }}>
                            {store.getState().myProfile.greeting}
                        </Text>
                    </View>
                </TouchableOpacity>




                <TouchableOpacity style={{ backgroundColor: 'aliceblue', padding: 10, flexDirection: 'row', marginBottom: 5 }}>
                    <Icon name="archive" size={20} color={constStyle.baseColor} />
                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                        <DefaultText text="Saved Message" level={2} />
                    </View>
                    <TouchableOpacity>
                        <Icon name="chevron-right" size={20} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: 'aliceblue', padding: 10, flexDirection: 'row', marginBottom: 5 }} onPress={() => this.props.onTapNotification()}>
                    <Icon name="bell" size={20} color={constStyle.baseColor} />
                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                        <DefaultText text="Notification" level={2} />
                    </View>
                    <TouchableOpacity>
                        <Icon name="chevron-right" size={20} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: 'aliceblue', padding: 10, flexDirection: 'row' }} onPress={() => {
                    Alert.alert(
                        "ChatMe",
                        "Version 1.0.0",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                }}>
                    <Icon name="help" size={20} color={constStyle.baseColor} />
                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                        <DefaultText text="About" level={2} />
                    </View>
                    <TouchableOpacity>
                        <Icon name="chevron-right" size={20} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </SafeAreaView>
        )
    };
}


const styles = StyleSheet.create({

});
