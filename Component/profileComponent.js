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
import { constStyle, randColor } from '../BaseComponent/constStyle';
import store from '../Source/store';
import { avatar, backGender } from '../Source/avatar';

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            me: false,
            userData: {}
        }
    }

    componentDidMount() {
        this.setState({ userData: this.props.userData(), me: this.props.userData().id == store.getState().myProfile.id ? true : false })
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} ></StatusBar>

                <TouchableOpacity style={[styles.floatBtn, { left: 20 }]} onPress={() => this.props.onBackTap()}>
                    <Icon name="chevron-left" size={25} color={constStyle.baseColor} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.floatBtn, { right: 20 }]}>
                    <Icon name="dots-three-horizontal" size={25} color={constStyle.baseColor} />
                </TouchableOpacity>

                <View style={{ backgroundColor: randColor(), height: 250 }}></View>

                <View style={{ width: 90, height: 90, borderRadius: 90 / 2, alignSelf: 'center', top: -70 / 2, backgroundColor: this.state.userData.gender == 1 ? backGender.male : backGender.female, overflow: "hidden", borderWidth: 2, borderColor: this.state.userData.gender == 1 ? backGender.male : backGender.female, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={avatar[this.state.userData.ava]} style={{ width: 90, height: 90 }} resizeMode={'cover'} />
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>
                        {this.state.userData.name}
                    </Text>
                    {this.state.me ? null :
                        <Text style={{ fontSize: 15, color: 'grey' }}>
                            {this.state.userData.distance} from you
                        </Text>
                    }
                    <Text style={{ marginTop: 20, marginHorizontal: 40, textAlign: 'center' }} ellipsizeMode={'tail'} numberOfLines={8}>
                        {this.state.userData.greeting}
                    </Text>
                </View>
                {this.state.me ? null :
                    <TouchableOpacity onPress={() => this.props.onChatPress(this.state.userData)}
                        style={[{ backgroundColor: constStyle.baseColor, marginBottom: 60, width: 150, height: 40, borderRadius: 40 / 2, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }, constStyle.shadow.depth2]}>
                        <Text style={{ color: 'white', fontSize: 17 }}>
                            Start Chat
                    </Text>
                    </TouchableOpacity>
                }

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
