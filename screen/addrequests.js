import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button,ActivityIndicator, Platform, PermissionsAndroid, ToastAndroid, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DatePicker from 'react-native-datepicker';
import { Title, Modal } from 'react-native-paper';

export default class Addrequestscreen extends Component {s
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const latitude = navigation.getParam('latitude', '');
    const longitude = navigation.getParam('longitude', '');
    this.state = {
      latitude : latitude,
      longitude : longitude,
      showMe : true,
      ready: false,
      where: { lat: null, lng: null },
      error: null,
      loading: false,
      info: {
        name: null,
        temp: null,
        humidity: null,
        desc: null,
        wind: null,
        icon: null,

      }
    }
  }
  // *Permission Allow*
  hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
}
getLocation = async () => {
  const hasLocationPermission = await this.hasLocationPermission();

  if (!hasLocationPermission) return;

  this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
          (position) => {
              this.setState({
                  where: { lat: position.coords.latitude, lng: position.coords.longitude },
                  location: position,
                  loading: false
              });
              console.log(position);
          },
          (error) => {
              this.setState({ location: error, loading: false });
              console.log(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
      );
  });
}

  componentDidMount() {
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
  //   Geolocation.setRNConfiguration({ authorizationLevel: 'whenInUse', skipPermissionRequests: true, });
  //   let geoOptions = {
  //     enableHighAccuracy: true,
  //     timeOut: 20000,
  //     maximumAge: 60 * 60 * 24
  //   };
  //   this.setState({ ready: false, error: null,loading: true });
  //   Geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);
  // }
  // geoSuccess = (position) => {
  //   const hasLocationPermission = this.hasLocationPermission();
  //   if (!hasLocationPermission) return;
  //   console.log(position.coords.latitude);
  //   console.log(position.coords.longitude);
  //   this.setState({
  //     ready: true,
  //     where: { lat: position.coords.latitude, lng: position.coords.longitude },
  //     loading: false
  //   })
  // }
  // geoFailure = (err) => {
  //   this.setState({ error: err.message });
  }
  submitRequest = async () => {
    let myRequest = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      fromdate: this.state.fromdate,
      todate: this.state.date,
      area: this.state.area,
      color: 'red',
      statusValue: 'กำลังรอเจ้าหน้าที่ตรวจสอบ',
      lastupdate: 'ยังไม่มีการอัพเดท'

    }

    alert(`คุณได้ส่งคำรองข้อเรียบร้อยแล้ว เจ้าหน้าที่จะแจ้งสถานะภายใน 1-5 วันก่อนวันดำเนินการ`);
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
    return (
        <View style={styles.MainContainer}>

        <Text style={styles.txtLogin}>ส่งคำร้อง</Text>
        <View>
          <Text style={{paddingLeft:20,fontSize:15, marginTop:5, color:'#261a0d'}}>ชื่อจริง-นามสกุล</Text>
        <TextInput
          style={styles.textInputStyle}
          backgroundColor='white'
          paddingLeft= {45}
          placeholder="ชื่อ-นามสกุล"
          placeholderTextColor='grey'
          onChangeText = {(name) => this.setState({name:name})}
        />
        </View>
        <View>
        <Text style={{paddingLeft:20,fontSize:15, marginTop:5, color:'#261a0d'}}>เบอร์โทรติดต่อ</Text>
        <TextInput
          style={styles.textInputStyle}
          backgroundColor='white'
          paddingLeft= {45}
          keyboardType={'numeric'}
          placeholder="เบอร์โทร"
          placeholderTextColor='grey'
          onChangeText = {(phone) => this.setState({phone:phone})}
        />
        </View>
        <View>
        <Text style={{paddingLeft:20,fontSize:15, marginTop:5, color:'#261a0d'}}>ที่อยู่ปัจจุบัน</Text>
        <TextInput
          style={styles.textInputStyle}
          backgroundColor='white'
          paddingLeft= {45}
          placeholder="ที่อยู่"
          placeholderTextColor='grey'
          onChangeText = {(address) => this.setState({address:address})}
        />
        </View>
        <View>
        <Text style={{paddingLeft:20,fontSize:15, marginTop:5, color:'#261a0d'}}>ขนาดพื้นที่</Text>
        <TextInput
          style={styles.textInputStyle}
          backgroundColor='white'
          paddingLeft= {45}
          keyboardType={'numeric'}
          placeholder="พื้นที่ (ตร.ม. โดยประมาณ)"
          placeholderTextColor='grey'
          onChangeText = {(area) => this.setState({area:area})}
        />
        </View>
        <DatePicker
          style={{width: 250, marginTop:15,}}
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
              marginLeft: 36,
              backgroundColor:'#261a0d'
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        {/* <Button title='แสดงที่อยู่ปัจจุบันของฉัน' onPress={this.getLocation}/> */}
        {this._RenderloadingOverlay()}
        <Text style={{marginTop:10}}>ละติจูด : {this.state.latitude}</Text>
        <Text style={{marginBottom:10}}>ลองติจูด : {this.state.longitude}</Text>
        <Button title='กำหนดจุดที่จะเผา' onPress={()=>this.props.navigation.navigate('Sending')}/>
        <View style={{ margin: 25, width:270, height:40 }}>
          <Button
          title="ส่งข้อมูล"
          color="green"
          onPress={() => {
             if(this.state.name==null||this.state.phone==null||this.state.address==null){
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
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor:'#f5efdb'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  body: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textInputStyle: {
    height: 40,
    width: 350,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginTop: 8,
    // borderRadius: 25,
  },
  txtLogin: {
    padding: 20,
    fontWeight: "bold",
    fontSize: 20
  },
  inicon:{
    width: 25,
    height: 25,
    position: 'absolute',
    top: 10,
    left: 37
  },
  modalView:{
    height:200,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute'
  }

});  