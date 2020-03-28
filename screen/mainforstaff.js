import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,} from 'react-native';
import Mapstaff from '../screen/mapforstaff';
import Homescreen from '../screen/home';
import UpdateScreen from '../screen/updatestatus';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ApiContainer from '../screen/ApiContainer';
export default class MainStaffScreen extends React.Component {
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
      header:false,
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
      tabBarLabel: "List",
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={'ios-albums'} />
        </View>
      )
    }
  },
  Update:{
    screen:UpdateScreen
  }
})
console.disableYellowBox = true;
const AppContainer = createAppContainer(TabNavigator);
