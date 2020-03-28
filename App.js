import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,} from 'react-native';
import Mapuser from './screen/mapforuser';
import Homescreen from './screen/home';
import Mainscreen from './screen/main'
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Addrequestscreen from './screen/addrequests';
import ApiContainer from './screen/ApiContainer';
import MainUserScreen from './screen/mainforuser';
import MainStaffScreen from './screen/mainforstaff';
import Loginscreen from './screen/login';
export default class App extends React.Component {
  render() {
    return (
        <NavigationContainer>
        <AppContainer />
        </NavigationContainer>
    );
  }
}
const StackAppNavigator = createStackNavigator(
  {
  Home : Homescreen,
  Map : Mapuser,
  Main : Mainscreen,
  Reqlist : ApiContainer,
  Mainuser : MainUserScreen,
  Mainstaff : MainStaffScreen,
  Login : Loginscreen,
},
{
  initialRouteName: "Main",
  defaultNavigationOptions: {
    header:false,
    headerStyle: {
      backgroundColor: "black",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent:'center',
      alignItems:'center',
    },
  }
}
);
console.disableYellowBox = true;
const AppContainer = createAppContainer(StackAppNavigator);
