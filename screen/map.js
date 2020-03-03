import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
export default class Mapscreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
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
          initialRegion={{
            latitude: 20.050470250943587,
            longitude: 99.87799879855217,
            latitudeDelta: 0.1922,
            longitudeDelta: 0.0421,
          }}>

          {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
            const coords = {
              latitude: marker.latitude,
              longitude: marker.longitude,
            };
            const name = `ชื่อผู้ส่ง : ${marker.name}`;
            const status = `สถานะ : ${marker.statusValue}`;
            
            return (
              <MapView.Marker
                key={index}
                coordinate={coords}
                title={name}
                description={status}>
                </MapView.Marker>
            );
          })}
        </MapView>
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
  marker:{
    backgroundColor:'white',
    padding: 5,
    borderRadius: 5
  },
  text:{
    color:'black',
    fontWeight:'bold'
  }
});

