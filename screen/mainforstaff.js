import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, } from 'react-native';
import Mapstaff from '../screen/mapforstaff';
import Homescreen from '../screen/home';
import UpdateScreen from '../screen/updatestatus';
import Staffreq from '../screen/stafflistreq';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ApiContainer from '../screen/ApiContainer';
import Loginscreen from './login';
export default class MainStaffScreen extends React.Component {
  static navigationOptions =
    {
      title: 'ชิงเผา Application'
    };
  render() {
    return (

      <SafeAreaView style={{ flex: 1 }}>
        <AppContainer />
      </SafeAreaView>

    );
  }
}
const LoginStack = createStackNavigator({ Login : Loginscreen });
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
    screen: Mapstaff,
    navigationOptions: {
      tabBarLabel: 'แผนที่',
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={'ios-map'} />
        </View>
      )
    }
  },
  Reqlist: {
    screen: ApiContainer,
    navigationOptions: {
      tabBarLabel: "ลิสต์ทั้งหมด",
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={'ios-albums'} />
        </View>
      )
    }
  },
  Staffreq: {
    screen: Staffreq,
    navigationOptions: {
      tabBarLabel: "ลิสต์ของฉัน",
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={'ios-contact'} />
        </View>
      )
    }
  },
  Update: {
    screen: UpdateScreen
  }
})
console.disableYellowBox = true;
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Tab: TabNavigator,
      Login: LoginStack
    }
  )
);
