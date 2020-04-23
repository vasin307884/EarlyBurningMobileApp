import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageComponent, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';



export default class Mainscreen extends React.Component {
    static navigationOptions =
    {
      title: 'หน้าเริ่มต้น'
    };
    render() {
        return (
            <View style={{width:'100%', height: '100%',backgroundColor:'#f5efdb'}}>
                <View>
                <Image source={require('../immg/Logo.png')} style={{width: 400, height: 350, alignSelf:"center"}}/>
                <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Mainuser')}><Image source={require('../immg/loginuser.png')} style={{width: 200, height: 100, alignSelf:"center"}}/></TouchableOpacity>
                <Text style={{fontSize: 20,color:'grey', alignSelf:"center"}}>Or</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Image source={require('../immg/loginstaff.png')} style={{width: 200, height: 100, alignSelf:"center"}}/></TouchableOpacity>
                </View>
                </View>
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