import React from 'react';
import {
    Text,
    StatusBar,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { DefaultText } from '../BaseComponent/defaultText';
import { constStyle } from '../BaseComponent/constStyle';



export function HeaderComponent({ scene, previous, navigation }) {


    return (
        <View style={[styles.headerContainer, constStyle.shadow.depth3]}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="flower" size={20} color={constStyle.baseColor} style={{ marginRight: 5 }} />
                <DefaultText text='ChatMe' level={1} color={constStyle.baseColor} />
            </View>
        </View>
    );
}

export function HeaderComponentBasic({ scene, previous, navigation }) {
    const option = scene.route

    return (
        <View style={[styles.headerContainer, constStyle.shadow.depth3]}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />

            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}>
                <View style={[styles.headerItemWrapper]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="chevron-left" size={25} color={constStyle.baseColor} />
                        <DefaultText text={option.params.item.name} level={1} color={constStyle.baseColor} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.headerItemWrapper, { alignItems: 'flex-end' }]}>
                    <TouchableOpacity>
                        <Icon name="dots-three-vertical" size={20} color={constStyle.baseColor} />
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
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />

            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}>
                <View style={[styles.headerItemWrapper]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="chevron-left" size={25} color={constStyle.baseColor} />
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
        height: 50,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    headerItemWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
});
