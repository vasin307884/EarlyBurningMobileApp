import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button,ActivityIndicator, Alert,Image, AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode'
export default class Staffreq extends Component {
    constructor() {
        super()
        this.state = {
        id:'',
          first_name: '',
          last_name: '',
          email: '',
          errors: {}
        }
      }
      loadInitialState = async()=>{
        const token = await AsyncStorage.getItem('usertoken');
        const decoded = jwt_decode(token)
        this.setState({
            id:decoded.id,
          first_name: decoded.first_name,
          last_name: decoded.last_name,
          email: decoded.email
        })
        console.log(decoded);
     }
      componentDidMount() {
        this.loadInitialState().done();
      }
      logOut(e) {
        e.preventDefault()
        AsyncStorage.removeItem('usertoken')
        this.props.navigation.navigate('Login')
        alert("ออกจากระบบ!");
      }
  render() {

    return (
        <View style={styles.MainContainer}>
            <Text>ไอดี : {this.state.id}</Text>
            <Text>ชื่อ : {this.state.first_name}</Text>
            <Text>อีเมล : {this.state.email}</Text>
            <Button title ="ออกจากระบบ" onPress={this.logOut.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',

  }
});  