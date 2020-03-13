import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
export default class Loginscreen extends React.Component {
constructor(props){
    super(props);
    this.state ={
        username:'',
        password:'',
    }
}
// componentDidMount(){
//     this.loadInitialState().done();
// }
// loadInitialState = async()=>{
//     var value = await AsyncStorage.getItem('users');
//     if(value !== null){
//         // this.props.navigation.navigate('Mainstaff');
//     }
// }
login = () =>{
    fetch('https://chingphaow-application.herokuapp.com/users',{
        method: 'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.success === true){
            AsyncStorage.setItem('users',res.users);
            this.props.navigation.navigate('Mainstaff');
        }else{
            alert(res.message);
        }
    })
    .done();
}
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                placeholder='Username'
                onChangeText={(username)=>this.setState({username})}
                />
                <TextInput
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(password)=>this.setState({password})}
                />
                <Button onPress={this.login}>Login</Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
});  