import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button, ActivityIndicator, Alert, Image, AsyncStorage,FlatList,Picker } from 'react-native';
import jwt_decode from 'jwt-decode'
import Staffreqcard from '../component/staffreqcard';
const requesturi = 'https://chingphaow-application.herokuapp.com/requests/';
export default class Staffreq extends Component {
  interValID;
  constructor(props) {
    super(props)
    this.state = {
      requestsdata: [],
      loading: false,
      page: 1,
      seed: 1,
      refreshing: false,
      filterCrime: '',
      staff_id: '',
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }
  }
  async fetchRequestdata() {
    this.setState({ loading: true });
    try {
      let res = await fetch(requesturi, {
        method: 'GET'
      });
      let datas = await res.json();
      console.log("------data--------");
      console.log(datas);
      this.setState({
        requestsdata: datas,
        //personaldata: datas,
        loading: false,
        refreshing: false,
      });
      this.intervalID = setTimeout(this.fetchRequestdata.bind(this), 2000);
    } catch (error) {
      console.log(error);
      this.setState({
        requestsdata: [],
        loading: false,
        refreshing: false
      })
    }
  }
  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }
  loadInitialState = async () => {
    const token = await AsyncStorage.getItem('usertoken');
    const decoded = jwt_decode(token)
    this.setState({
      staff_id: decoded.staff_id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
    console.log(decoded);
  }
  async componentDidMount() {
    this.loadInitialState().done();
    await this.fetchRequestdata();
  }
  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed + 1
    }, () => {
      this.fetchRequestdata();
    })
  }
  updateFilter = (filterCrime) => {
    this.setState({ filterCrime: filterCrime })
 }
 async callupdate(item) {
  await this.props.navigation.navigate('Update', { id: item.id, items: item, statusValue: item.statusValue, color: item.color,staffid:item.staffid })
}
  logOut(e) {
    e.preventDefault()
    AsyncStorage.removeItem('usertoken')
    this.props.navigation.navigate('Login')
    alert("ออกจากระบบ!");
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Image source={require('../immg/use.png')}
            style={styles.ImgIcon}/>
      <View>
        <Text style={styles.infoadmin}>ชื่อ : {this.state.first_name}</Text>
      </View>
        <Image source={require('../immg/Email.png')}
            style={styles.ImgIcon2}/>
      <View>
        <Text style={styles.infoadmin}>อีเมล : {this.state.email}</Text>
      </View>
        <View style={{marginTop:15,
        marginLeft:30,
        marginRight:30,}}>
        <Button title="ออกจากระบบ" onPress={this.logOut.bind(this)} />
        </View>
        <View style={styles.container}>
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize:19, fontWeight:'bold'}}>จุดที่รับผิดชอบ</Text>
        </View>
          <View style={{backgroundColor:'#004d00',shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,}}>
          <Picker style={{color:'white'}}
            selectedValue={this.state.filterCrime}
            onValueChange={this.updateFilter} >
            <Picker.Item label="ทั้งหมด" value={this.state.statusValue} />
            <Picker.Item label="กำลังรอเจ้าหน้าที่ตรวจสอบ" value="กำลังรอเจ้าหน้าที่ตรวจสอบ" />
            <Picker.Item label="กำลังดำเนินการชิงเผา" value="กำลังดำเนินการชิงเผา" />
            <Picker.Item label="ชิงเผาเสร็จเรียบร้อยแล้ว" value="ชิงเผาเสร็จเรียบร้อยแล้ว" />

          </Picker>
        </View>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          data={this.state.requestsdata.data}
          renderItem={({ item }) =>{
          if ( !this.state.filterCrime || item.statusValue == this.state.filterCrime ) {
            if(item.staffid == this.state.staff_id){
            return (
              <TouchableOpacity onLongPress={() => { this.callupdate(item) }}>
              <Staffreqcard
                items={item}
                id={item.id}
                statusValue={item.statusValue}
                color={item.color}
                staffid={item.staffid}
              />
              </TouchableOpacity>
            )
          }}}}
        />
      </View>
      </View>
    );
  }
  }
const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: '#ecd9c6'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#ecd9c6',
    padding: 8,
  },
  infoadmin:{
    paddingLeft: 110,
    marginTop: 15,
    marginBottom: 15
  },
  ImgIcon:{
    height: 35,
    width: 35,
    position: 'absolute',
    top: 8,
    left: 60
  },
  ImgIcon2:{
    height: 35,
    width: 35,
    position: 'absolute',
    top: 58,
    left: 60
  }

});