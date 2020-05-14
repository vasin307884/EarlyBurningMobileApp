import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,} from 'react-native';
import Mapuser from './mapforuser';
import Homescreen from '../screen/home';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Addrequestscreen from '../screen/addrequests';
import Sendinglocation from '../screen/sendinglocation'

export default class MainUserScreen extends React.Component {
    static navigationOptions =
    {
      title: 'ชิงเผา Application',
      headerLeft: false,
      header:false
    };
  render() {
    return (
        <SafeAreaView style={{flex:1}}>
        <AppContainer />
        </SafeAreaView>
    );
  }
}
const MainStack = createStackNavigator({
  Sending : Sendinglocation,
},
{
  defaultNavigationOptions: {
    header:false
  }
  }
);

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
    screen: Mapuser,
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
  }
})
console.disableYellowBox = true;
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Tab: TabNavigator,
      Main: MainStack
    }
  )
);

