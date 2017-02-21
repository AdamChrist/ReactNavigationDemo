import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EleRNLocation from 'ele-react-native-location';

export default class Location extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            location: '未定位'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.state.location}
                </Text>
            </View>
        );
    }

    componentDidMount() {
        console.warn('componentDidMount');
        this.listener = EleRNLocation.addEventListener((data) => {
            console.warn(JSON.stringify(data));
            this.setState({
                location: JSON.stringify(data)
            })
        });
        EleRNLocation.startLocation({ onceLocation: true });
    }

    componentWillUnmount() {
        console.warn('componentWillUnmount');
        EleRNLocation.stopLocation();
        this.listener.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});