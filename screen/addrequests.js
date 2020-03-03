import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button,ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
export default class Addrequestscreen extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: { lat: null, lng: null },
      error: null,
      loading: false,
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
  componentDidMount() {
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
        statusValue:'กำลังรอเจ้าหน้าที่ตรวจสอบ'
    }

    alert(`คุณได้ส่งคำรองข้อเรียบร้อยแล้ว`);
    this.props.navigation.navigate('Map')
    fetch('http://192.168.2.33:4000/requests/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myRequest),
      });
      await this.loadData()
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
          placeholder="เบอร์โทร"
          placeholderTextColor="red"
          onChangeText = {(phone) => this.setState({phone:phone})}
        />
        <Text style={styles.welcome}>ที่อยู่ปัจจุบันของฉัน</Text>
        {this._RenderloadingOverlay()}
        <Text>ละติจูด : {this.state.where.lat}</Text>
        <Text>ลองติจูด : {this.state.where.lng}</Text>
        <View style={{ margin: 25 }}>
          <Button
          onPress={() => this.submitRequest()}
            title="ส่งข้อมูล"
            color="green"
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