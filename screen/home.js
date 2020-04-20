import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button,ActivityIndicator, Alert,Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DatePicker from 'react-native-datepicker';
import { Title } from 'react-native-paper';

export default class Homescreen extends Component {
  constructor(props) {
    super(props);
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
            <Title>{this.state.info.name}</Title>
            <Image style={{width:120,height:120}}
            source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}}
            />
            <Title>อุณหภูมิ : {this.state.info.temp} °C</Title>
            <Title>ความชื้นในอากาศ : {this.state.info.humidity} %</Title>
            <Title>แรงลม : {this.state.info.wind} m/s</Title>
            <Title>สถานะ : {this.state.info.desc}</Title>
            
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
    justifyContent: 'center',
  }
});  