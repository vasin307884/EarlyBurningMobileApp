import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button, Picker, SafeAreaView, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
import data from '../data/data.json';
export default class Mapuser extends Component {
  interValID;
  static navigationOptions =
    {
      title: 'แผนที่'
    };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
      page: 1,
      seed: 1,
      refreshing: false,
      region: {
        latitude: 20.050470250943587,
        longitude: 99.87799879855217,
        latitudeDelta: 0.2922,
        longitudeDelta: 0.0421
      }
    };
  }
  fetchMarkerData() {
    fetch('https://chingphaow-application.herokuapp.com/requests/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          markers: responseJson.data,
          refreshing: false
        });
        this.intervalID = setTimeout(this.fetchMarkerData.bind(this), 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillUnmount() {
    clearTimeout(this.intervalID);
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
  Refreshbutton() {
    this.setState({
      forceRefresh: Math.floor(Math.random() * 100)
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <View style={styles.MainContainer}>


          <MapView
            key={this.state.forceRefresh}
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

              return (

                <MapView.Marker
                  pinColor={marker.color}
                  key={index}
                  coordinate={coords}
                >
                  <MapView.Callout>
                  <Text style={{color:marker.color}}>สถานะ : {marker.statusValue}</Text>
                </MapView.Callout>
                </MapView.Marker>


              );
            })}
            {/* {data.map((marker, index) => {
              const date = `วันที่ : ${marker.acq_date}`;
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  }}
                  title={date}
                >
                  <Image source={require('../assets/fireicon.png')} style={{ height: 25, width: 25 }} />
                </Marker>
              );
            })} */}

          </MapView>


          <View style={{ flex: 1, alignItems:'flex-end', marginTop:10 }}>
            <TouchableOpacity style={{marginLeft:325}} onPress={() => { this.Refreshbutton() }}>
              <Icon name={'refresh'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  }
});

