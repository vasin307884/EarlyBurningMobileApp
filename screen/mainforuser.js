import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,} from 'react-native';
import Mapscreen from '../screen/map';
import Homescreen from '../screen/home';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Addrequestscreen from '../screen/addrequests';
export default class MainUserScreen extends React.Component {
    static navigationOptions =
    {
      title: 'ชิงเผา Application'
    };
  render() {
    return (
        <SafeAreaView style={{flex:1}}>
        <AppContainer />
        </SafeAreaView>
    );
  }
}
const TabNavigator = createMaterialBottomTabNavigator({
  Home: {
    screen: Homescreen,
    navigationOptions: {
      tabBarLabel: "หน้าหลัก",
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
        </View>
      )
    }
  },
  Map: {
    screen: Mapscreen,
    navigationOptions: {
      tabBarLabel: 'แผนที่',
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={'ios-map'} />
        </View>
      )
    }
  },
  Addreq: {
    screen: Addrequestscreen,
    navigationOptions: {
      tabBarLabel: "ส่งคำร้อง",
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={'ios-add-circle'} />
        </View>
      )
    }
  },
  initialRouteName: 'Home',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
})
console.disableYellowBox = true;
const AppContainer = createAppContainer(TabNavigator);
