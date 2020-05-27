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
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { DefaultText } from '../BaseComponent/defaultText';
import { constStyle, randColor } from '../BaseComponent/constStyle';
import { userData } from '../Source/sample';
import { avatar, backGender } from '../Source/avatar';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

function listItem(data, props) {
    return (
        <TouchableOpacity style={{ paddingHorizontal: responsiveWidth(5), marginTop: responsiveHeight(1), flexDirection: 'row', alignItems: 'center' }}
            onPress={() => props(data.item)}>
            <View style={{ backgroundColor: randColor(), width: 50, height: 50, borderRadius: 10, backgroundColor: data.item.gender == 1 ? backGender.male : backGender.female, overflow: "hidden", borderWidth: 2, borderColor: data.item.gender == 1 ? backGender.male : backGender.female, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={avatar[data.item.ava]} style={{ width: 50, height: 50 }} resizeMode={'cover'} />
            </View>
            <Text style={{ fontSize: responsiveFontSize(1.9), marginLeft: 10, flex: 1 }}>
                {data.item.name}
                {"\n"}
                <Text style={{ color: 'darkgrey', fontSize: responsiveFontSize(1.5) }}>
                    {data.item.greeting}
                </Text>
            </Text>
            <Text style={{ fontSize: responsiveFontSize(1.5), color: 'grey' }}>
                {data.item.distance}
            </Text>
        </TouchableOpacity>
    )
}

function listSeparator() {
    return (
        <View style={{ marginVertical: responsiveHeight(0.4) }}></View>
    )
}

export default class NewChatComponent extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} ></StatusBar>

                <TouchableOpacity style={[styles.floatBtn, { left: 20 }]} onPress={() => this.props.onBackTap()}>
                    <Icon name="chevron-left" size={responsiveFontSize(2.5)} color={constStyle.baseColor} />
                </TouchableOpacity>

                <Text style={{ height: responsiveHeight(17), fontSize: responsiveFontSize(2.2), color: constStyle.baseColor, textAlign: 'center',backgroundColor:'aliceblue',paddingTop:80 }}>
                    <Icon name="location" size={responsiveFontSize(2.2)} color={constStyle.baseColor} /> Someone Near You
                </Text>

                <FlatList
                    data={userData}
                    renderItem={item => listItem(item, this.props.onItemTap)}
                    style={styles.flatlistStyle}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={listSeparator}
                />

            </SafeAreaView>
        )
    };
}


const styles = StyleSheet.create({
    floatBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        position: 'absolute',
        zIndex: 10,
        top: 30
    }
});
