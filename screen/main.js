import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
export default class Mainscreen extends React.Component {
    static navigationOptions =
    {
      title: 'หน้าเริ่มต้น'
    };
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => this.props.navigation.navigate('Mainuser')}>สำหรับ user</Button>
                <Button onPress={() => this.props.navigation.navigate('Login')}>สำหรับ staff</Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});