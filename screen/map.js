import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Mapscreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
      region: {
        latitude: 20.050470250943587,
        longitude: 99.87799879855217,
        latitudeDelta: 0.1922,
        longitudeDelta: 0.0421
      }
    };
  }
  fetchMarkerData() {
    fetch('http://192.168.2.33:4000/requests/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          markers: responseJson.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {

        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    this.fetchMarkerData();
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={this.state.region}>

          {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
            const coords = {
              latitude: marker.latitude,
              longitude: marker.longitude,
            };
            const name = `ชื่อผู้ส่ง : ${marker.name}`;
            const status = `สถานะ : ${marker.statusValue}`;

            return (
              <MapView.Marker
                pinColor={marker.color}
                key={index}
                coordinate={coords}
                title={name}
                description={status}>
              </MapView.Marker>
              
              
            );
          })}
          
        </MapView>
        <View style={{flex:1,paddingLeft:350}}>
       <TouchableOpacity>
       <Icon name={'refresh'} size={50}/>
         </TouchableOpacity>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5
  },
  text: {
    color: 'black',
    fontWeight: 'bold'
  }
});

