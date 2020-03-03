import React, { Component } from 'react'; 
import { StyleSheet, View,Text } from 'react-native';   
export default class Homescreen extends React.Component {
    render() {
      return (
<View style={styles.container}>
      <Text>หน้าข่าวสาร</Text>
    </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });