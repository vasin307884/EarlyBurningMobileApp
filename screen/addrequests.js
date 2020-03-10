import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button,ActivityIndicator, Alert,Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DatePicker from 'react-native-datepicker';
import { Title } from 'react-native-paper';
export default class Addrequestscreen extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: { lat: null, lng: null },
      error: null,
      loading: false,
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
  //*Permission Allow*
//   hasLocationPermission = async () => {
//     if (Platform.OS === 'ios' ||
//         (Platform.OS === 'android' && Platform.Version < 23)) {
//       return true;
//     }

//     const hasPermission = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//     );

//     if (hasPermission) return true;

//     const status = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//     );

//     if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

//     if (status === PermissionsAndroid.RESULTS.DENIED) {
//       ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
//     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//       ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
//     }

//     return false;
// }
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
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      fromdate:
        year + '/' + month + '/' + date + ' ' + hours + ':' + min + ':' + sec,
    });
    Geolocation.setRNConfiguration({ authorizationLevel: 'whenInUse', skipPermissionRequests: false, });
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
    };
    // const hasLocationPermission = this.hasLocationPermission();
    // if (!hasLocationPermission) return;
    this.setState({ ready: false, error: null,loading: true });
    Geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);
  }
  geoSuccess = (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
      loading: false
    })
  }
  geoFailure = (err) => {
    this.setState({ error: err.message});
  }
  submitRequest = async () => {
    let myRequest = {
        name:this.state.name,
        phone:this.state.phone,
        address:this.state.address,
        latitude:this.state.where.lat,
        longitude:this.state.where.lng,
        fromdate:this.state.fromdate,
        todate:this.state.date,
        color:'red',
        statusValue:'กำลังรอเจ้าหน้าที่ตรวจสอบ',
        lastupdate:'ยังไม่มีการอัพเดท'
    }

    alert(`คุณได้ส่งคำรองข้อเรียบร้อยแล้ว`);
    this.props.navigation.navigate('Map')
    fetch('https://chingphaow-application.herokuapp.com/requests/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myRequest),
      }).then(console.log(myRequest))
}
_RenderloadingOverlay = () => {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0c9" />
        <Text>กำลังหาตำแหน่งของคุณ</Text>
        </View>
      );
    }
  };
  render() {
    console.log(this.state.info)
    return (
        <View style={styles.MainContainer}>
{/*           
            <Title>{this.state.info.name}</Title>
            <Title>อุณหภูมิ : {this.state.info.temp} °C</Title>
            <Title>ความชื้นในอากาศ : {this.state.info.humidity} %</Title>
            <Title>แรงลม : {this.state.info.wind} m/s</Title>
            <Title>สถานะ : {this.state.info.desc}</Title>
           */}
        <Text style={styles.txtLogin}>กรอกข้อมูล</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="ชื่อ-นามสกุล"
          placeholderTextColor="red"
          onChangeText = {(name) => this.setState({name:name})}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="ที่อยู่"
          placeholderTextColor="red"
          onChangeText = {(address) => this.setState({address:address})}
        />
        <TextInput
          style={styles.textInputStyle}
          keyboardType={'numeric'}
          placeholder="เบอร์โทร"
          placeholderTextColor="red"
          onChangeText = {(phone) => this.setState({phone:phone})}
        />
        <DatePicker
          style={{width: 200}}
          date={this.state.date} //initial date from state
          mode="datetime" //The enum of date, datetime and time
          placeholder="กำหนดวันที่"
          format="YYYY/MM/DD HH:mm:SS"
          minDate="2019/01/01"
          maxDate="2030/01/01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <Text style={styles.welcome}>ที่อยู่ปัจจุบันของฉัน</Text>
        {this._RenderloadingOverlay()}
        <Text>ละติจูด : {this.state.where.lat}</Text>
        <Text>ลองติจูด : {this.state.where.lng}</Text>
        <View style={{ margin: 25 }}>
          <Button
          title="ส่งข้อมูล"
          color="green"
          onPress={() => {
            if(this.state.info.temp > 50||this.state.info.wind > 10||this.state.info.humidity < 10){
              alert("ไม่สามารถส่งคำร้องได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง");
              return;
            }else if(this.state.name==null||this.state.phone==null||this.state.address==null){
              alert("กรุณากรอกข้อมูลให้ครบ")
              return;
            }
            this.submitRequest()}
          }
          />
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
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textInputStyle: {
    borderColor: '#9a73ef',
    borderWidth: 1,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginTop: 8
  },
  txtLogin: {
    padding: 20,
    fontWeight: "bold",
    fontSize: 20
  }
});  