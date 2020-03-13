import React, { Component } from 'react'
import { StatusBar, Platform, SafeAreaView, StyleSheet, View, Text,Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import _ from 'lodash'
import data from '../data/data.json';
export default class TestMap extends Component {
    state = {
        data: [],
        isLoading: true
    }
    componentDidMount() {
    //     fetch('https://firms.modaps.eosdis.nasa.gov/data/active_fire/noaa-20-viirs-c2/csv/J1_VIIRS_C2_SouthEast_Asia_24h.csv')
    //         .then(res => res.text())
    //         .then(body => {
    //         try {
    //             const lines = body.split('\n')
    //             const result = []
    //             const headers = lines[0].split(',')

    //             for (let i = 1; i < lines.length; i++) {        
    //             if (!lines[i])
    //                 continue
    //             const obj = {}
    //             const currentline = lines[i].split(',')

    //             for (let j = 0; j < headers.length; j++) {
    //                 obj[headers[j]] = currentline[j]
    //             }       
    //             result.push(obj)
    //             }
    //             const resultJSON = JSON.stringify(result)
    //             this.setState({data: resultJSON, isLoading: false})
    //             } catch {
    //         throw Error(body);
    //     }
    // })
    // .catch(console.error);  
}

    render(){
        const isLoading = this.state.isLoading;
        return(
            <SafeAreaView style={styles.body}>
                <View style={{flex:1}}>
                    <Text style={styles.appName}>Fire Spot</Text>
                </View>
                <MapView
                    style={styles.map}
                    region={{
                      latitude: 20.050470250943587,
                      longitude: 99.87799879855217,
                      latitudeDelta: 5,
                      longitudeDelta: 2
                      }}
                      showsUserLocation={true}>
                          
                          {data.map((marker,index)=>{ 
                        
                        return(
                        <Marker
                            key={index}
                            coordinate={{
                                latitude:marker.latitude, 
                                longitude:marker.longitude
                            }}
                            title={marker.acq_date}
                        >
                        <Image source={require('../assets/fireicon.png')} style={{height: 15, width:15 }} />
                          </Marker>
                        );
                          } )}                    
                    </MapView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    map: {
        flex: 14.5,
      },
      appName: {
          alignSelf: 'center',
          fontSize: 30,
          fontWeight: '400',
          ...Platform.select({
            ios: {
                fontFamily: 'Avenir Next'
            },
            android: {
                fontFamily: 'Roboto'
            }
        })
      }
})