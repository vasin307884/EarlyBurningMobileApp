import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, Dimensions, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { login } from '../component/UserFunctions'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width:WIDTH}=Dimensions.get('window')
export default class Loginscreen extends React.Component {
    static navigationOptions =
    {
      header:false
    };
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
        } else {
          alert("Email หรือ Password ไม่ถูกต้อง กรุณาลองอีกครั้ง");
        }  
    })
}
componentDidMount() {
  this.loadInitialState().done();
}
loadInitialState = async () => {
  var user = await AsyncStorage.getItem('usertoken');
  if (user !== null) {
    this.props.navigation.navigate('Mainstaff');
  }
}

    render() {
        return (
            <View style={{width:'100%', height: '100%', backgroundColor:'#f5efdb'}}>
                <Image source={require('../immg/Logo.png')} style={{width: 400, height: 350, alignSelf:"center"}}/>
            <View style={styles.inputcontainer}>
            <Image source={require('../immg/use.png')}
            style={styles.inputicon}/>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email:email })}
                />
            </View>
            <View style={styles.inputcontainer}>
            <Image source={require('../immg/lock.png')}
            style={styles.inputicon}/>
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password:password })}
                />
            </View>
                <Button style={styles.btnLogin} onPress={this.onSubmit}>
                    <Text style={styles.text}>เข้าสู่ระบบ</Text>
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    inputcontainer:{
        marginTop: 10
    },
    input:{
        width: WIDTH-55,
        height: 45,
        // borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25
    },
    inputicon:{
        width: 25,
        height: 25,
        position: 'absolute',
        top: 10,
        left: 37
    },
    // btnEye:{
    //     position: 'absolute',
    //     top: 10,
    //     right: 37
    // },
    btnLogin:{
        width: WIDTH-55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'green',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 25
    },
    text:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
});  