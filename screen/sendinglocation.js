import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button, Picker, SafeAreaView, Image, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import data from '../data/data.json';
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 20.050470250943587;
const LONGITUDE = 99.87799879855217;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class Sendinglocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            page: 1,
            seed: 1,
            refreshing: false,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        };
    }
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = Geolocation.watchPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            }
        );
    }
    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
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
                        initialRegion={this.state.region}
                        onRegionChange={region => this.setState({ region })}
                        onRegionChangeComplete={region => this.setState({ region })}
                    >
                        <MapView.Marker
                            draggable
                            coordinate={this.state.region}
                            onDragEnd={(e) => this.setState({ region: e.nativeEvent.coordinate })}
                        />
                    </MapView>


                    <View style={{ flex: 1, flexDirection:'row', marginTop:10 }}>
                        <TouchableOpacity style={{marginLeft:5}} onPress={() => this.props.navigation.navigate('Addreq')}>
                            <Icon2 name={'arrow-back'} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:325}} onPress={() => { this.Refreshbutton() }}>
                            <Icon name={'refresh'} size={30} />
                        </TouchableOpacity>
                    </View>
                    <Text>ละติจูด : {this.state.region.latitude}</Text>
                    <Text style={{marginBottom:10}}>ลองจิจูด : {this.state.region.longitude}</Text>
                    <Button title='ใช้จุดที่กำหนด' onPress={()=>this.props.navigation.navigate('Addreq',{latitude:this.state.region.latitude,longitude:this.state.region.longitude})} />
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
