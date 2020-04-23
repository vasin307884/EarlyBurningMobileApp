import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button,ActivityIndicator, Alert,Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DatePicker from 'react-native-datepicker';
import { Title } from 'react-native-paper';
export default class Homescreen extends Component {
  constructor() {
    super();
    this.state = {
      info:{
        name:null,
        temp:null,
        humidity:null,
        desc:null,
        wind:null,
        icon:null,
      }
    }
  }
  
getWeather(){
  Mycity = "Chiang Rai"
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&appid=06221fc99afc08d9030d60c36b98c60e`)
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    this.setState({
      info:{
        name:data.name,
        temp:data.main.temp,
        humidity:data.main.humidity,
        wind:data.wind.speed,
        desc:data.weather[0].description,
        icon:data.weather[0].icon
      }
    })
  }).catch(err=>{
    Alert.alert("Error"+err.message+"โปรดเช็คการเชื่อมต่อเน็ตของท่าน",[{text:"OK"}])
  })
}
  componentDidMount() {
    this.getWeather()
  }
  render() {
    console.log(this.state.info)
    return (
        <View style={styles.MainContainer}>
          <View style={styles.ShowTop}>
            <Title style={{justifyContent:'center'}}>{this.state.info.name}</Title>
            <Image style={{width:120,height:120,justifyContent:'center', position:'relative'}}
            source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}}
            />
          </View>
            <View style={styles.Datacontainer1}>
            <Image source={require('../immg/Temp.png')}
            style={styles.inputicon1}/>
            <Title>อุณหภูมิ : {this.state.info.temp} °C</Title>
            </View>
            <View style={styles.Datacontainer2}>
            <Image source={require('../immg/Water.png')}
            style={styles.inputicon2}/>
            <Title>ความชื้นในอากาศ : {this.state.info.humidity} %</Title>
            </View>
            <View style={styles.Datacontainer1}>
            <Image source={require('../immg/Wind.png')}
            style={styles.inputicon1}/>
            <Title>แรงลม : {this.state.info.wind} m/s</Title>
            </View>
            <View style={styles.Datacontainer2}>
            <Image source={require('../immg/State.png')}
            style={styles.inputicon2}/>
            <Title>สถานะ : {this.state.info.desc}</Title>
            </View>
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
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5efdb'
  },

  inputicon1:{
    width: 50,
    height: 50,
    position: 'absolute',
    top: 15,
    left: 37,
  },

  inputicon2:{
    width: 50,
    height: 50,
    position: 'absolute',
    top: 15,
    left: 240
  },

  ShowTop:{
    alignItems: 'center',
  },

  Datacontainer1:{
    width:300,
    height: 90,
    // borderWidth: 1,
    // borderColor: 'brown',
    paddingTop: 25,
    paddingBottom: 30,
    paddingRight: 15,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 25,
    alignItems:'flex-end',
    backgroundColor: '#ecd9c6',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },

  Datacontainer2:{
    width:300,
    height: 90,
    // borderWidth: 1,
    // borderColor: 'brown',
    paddingTop: 25,
    paddingBottom: 30,
    paddingLeft: 15,
    marginTop: 20,
    marginLeft: 100,
    borderRadius: 25,
    backgroundColor: '#d4d4aa',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  }
});  