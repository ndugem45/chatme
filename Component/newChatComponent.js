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
import { avatar } from '../Source/avatar';

function listItem(data, props) {
    return (
        <TouchableOpacity style={{ paddingHorizontal: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => props(data.item)}>
            <View style={{ backgroundColor: randColor(), width: 50, height: 50, borderRadius: 10, backgroundColor: 'aliceblue', overflow: "hidden", borderWidth: 2, borderColor: 'aliceblue', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={avatar[data.item.ava]} style={{ width: 50, height: 50 }} resizeMode={'cover'} />
            </View>
            <Text style={{ fontSize: 17, marginLeft: 10, flex: 1 }}>
                {data.item.name}
                {"\n"}
                <Text style={{ color: 'darkgrey', fontSize: 14 }}>
                    {data.item.greeting}
                </Text>
            </Text>
            <Text style={{ fontSize: 12, color: 'grey' }}>
                {data.item.distance}
            </Text>
        </TouchableOpacity>
    )
}

function listSeparator() {
    return (
        <View style={{ marginVertical: 5 }}></View>
    )
}

export default class NewChatComponent extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <Text style={{ paddingHorizontal: 40, fontSize: 20, marginVertical: 10 }}>
                    Someone Near You
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

});
