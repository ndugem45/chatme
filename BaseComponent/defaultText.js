import React from 'react';
import {
    Text,
} from 'react-native';
import { constStyle } from './constStyle';
import DeviceInfo from 'react-native-device-info';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';


export class DefaultText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            size: [responsiveFontSize(1.8), responsiveFontSize(2.0), responsiveFontSize(2.2), responsiveFontSize(2.4)]
        };
    }

    _fontSize() {
        return this.props.level >= 4 ? this.state.size[2] : this.props.smallText ? responsiveFontSize(1.6) : this.state.size[this.props.level]
    }

    _color() {
        return this.props.color ? this.props.color : this.props.state == 'active' ? constStyle.baseColor : this.props.state == 'deactive' ? 'darkgrey' : 'dimgrey'
    }

    _align() {
        return this.props.align ? this.props.align : 'auto'
    }

    render() {
        return (
            <Text style={{ fontSize: this._fontSize(), color: this._color(), textAlign: this._align() }}>
                {this.props.text}
            </Text>
        )
    }
}
