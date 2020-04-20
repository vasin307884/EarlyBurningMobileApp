import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { login } from '../component/UserFunctions'
export default class Loginscreen extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state ={
    //         username:'',
    //         password:'',
    //     }
    // }
    // componentDidMount(){
    //     this.loadInitialState().done();
    // }
    // loadInitialState = async()=>{
    //     var value = await AsyncStorage.getItem('usertoken');
    //     if(value !== null){
    //         this.props.navigation.navigate('Mainstaff');
    //     }
    // }
    // login = () =>{
    //     fetch('https://chingphaow-application.herokuapp.com/staff',{
    //         method: 'POST',
    //         headers:{
    //             'Accept' : 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: this.state.username,
    //             password: this.state.password,
    //         })
    //     })
    //     .then((response)=>response.json())
    //     .then((res)=>{
    //         if(res.success === true){
    //             AsyncStorage.setItem('users',res.users);
    //             this.props.navigation.navigate('Mainstaff');
    //         }else{
    //             alert(res.message);
    //         }
    //     })
    //     .done();
    // }
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
    
        const user = {
          email: this.state.email,
          password: this.state.password,
        }
    
        login(user).then(res => {
          if (res) {
            this.props.navigation.navigate('Mainstaff');
            alert("เข้าสู่ระบบสำเร็จ!");
          }else{
            alert("Email หรือ Password ไม่ถูกต้อง กรุณาลองอีกครั้ง");
          }
        })
      }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Username'
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email:email })}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password:password })}
                />
                <Button onPress={this.onSubmit}>Login</Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
});  