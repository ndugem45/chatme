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
import Icon from 'react-native-vector-icons/Entypo';
import { DefaultText } from '../BaseComponent/defaultText';
import { constStyle } from '../BaseComponent/constStyle';

export default class SettingComponent extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <TouchableOpacity style={{ backgroundColor: constStyle.baseColor, padding: 10, marginTop: 30, marginHorizontal: 10, borderRadius: 30 / 2, flexDirection: 'row', marginBottom: 20 }} onPress={() => this.props.onTapProfile()}>
                    <View style={{ width: 70, height: 70, borderRadius: 70 / 2, backgroundColor: 'whitesmoke' }}></View>
                    <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                        <DefaultText text="My name is Tom" level={3} color='white' />
                        <DefaultText text="+628567890003" level={1} color='white' />
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

                <TouchableOpacity style={{ backgroundColor: 'aliceblue', padding: 10, flexDirection: 'row', marginBottom: 5 }} onPress={()=> this.props.onTapNotification()}>
                    <Icon name="bell" size={20} color={constStyle.baseColor} />
                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                        <DefaultText text="Notification" level={2} />
                    </View>
                    <TouchableOpacity>
                        <Icon name="chevron-right" size={20} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </TouchableOpacity>
                
                <TouchableOpacity style={{ backgroundColor: 'aliceblue', padding: 10, flexDirection: 'row' }}>
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
