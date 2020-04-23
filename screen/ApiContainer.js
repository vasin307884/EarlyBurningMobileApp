import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity, ScrollView, RefreshControl, Button,Picker
} from "react-native";
import Mycard from '../component/mycard';
const requesturi = 'https://chingphaow-application.herokuapp.com/requests/';
export default class ApiContainer extends React.Component {
  interValID;
  static navigationOptions =
    {
      title: 'คำร้องขอ'
    };
  constructor(props) {
    super(props);
    this.state = {
      requestsdata: [],
      loading: false,
      error: null,
      page: 1,
      seed: 1,
      refreshing: false,
      filterCrime: ''
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
  async componentDidMount() {
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
  async callupdate(item) {
    await this.props.navigation.navigate('Update', { id: item.id, items: item, statusValue: item.statusValue, color: item.color,staffid:item.staffid })
  }
  updateFilter = (filterCrime) => {
    this.setState({ filterCrime: filterCrime })
 }
  render() {

    return (

      <View style={styles.container}>
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
            return (
            <TouchableOpacity onLongPress={() => { this.callupdate(item) }}>
              <Mycard
                items={item}
                id={item.id}
                statusValue={item.statusValue}
                color={item.color}
                staffid={item.staffid}
              />
            </TouchableOpacity>
            )
          }}}
        />
      </View>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecd9c6',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}
);