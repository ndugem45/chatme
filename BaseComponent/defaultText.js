import React from 'react';
import {
    Text,
} from 'react-native';
import { constStyle } from './constStyle';


export class DefaultText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            size: [14, 16, 18, 20]
        };
    }

    _fontSize() {
        return this.props.level >= 4 ? this.state.size[2] : this.props.smallText ? 12 : this.state.size[this.props.level]
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
