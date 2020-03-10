import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
FlatList,
Text,
TouchableOpacity,ScrollView,RefreshControl,Button
} from "react-native";
import Mycard from '../component/mycard';
const requesturi = 'https://chingphaow-application.herokuapp.com/requests/';
export default class ApiContainer extends React.Component {
    static navigationOptions =
    {
      title: 'คำร้องขอ'
    };
constructor(props) {
    super(props);
    this.state = {
      requestsdata:[],
      loading: false,
      error: null,
      page: 1,
      seed: 1,
      refreshing: false,
    }
  }
  async fetchRequestdata() {
    this.setState({ loading: true});
    try {
      let res = await fetch(requesturi, { 
      method: 'GET' });
      let datas = await res.json();
      console.log("------data--------");
      console.log(datas);
      this.setState({
        requestsdata: datas,
        //personaldata: datas,
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        requestsdata:[],
        loading: false,
        refreshing: false
      })
    }
  }
  async componentDidMount() {
    await this.fetchRequestdata();
  }
  handleRefresh = () =>{
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed +1
    },() =>{
      this.fetchRequestdata();
    })
  }
 async callupdate(item) { 
   await this.props.navigation.navigate('Update', { id: item.id,items:item,statusValue:item.statusValue,color:item.color})
  }
  render() {

    return (
      
        <View style={styles.container}>

            <FlatList
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
              data={this.state.requestsdata.data}
              renderItem={({ item }) =>
                  <TouchableOpacity onLongPress={()=>{this.callupdate(item)}}>
                  <Mycard 
                  items={item}
                  id={item.id}
                  statusValue={item.statusValue}
                  color={item.color}
                  />
                  </TouchableOpacity>
              }
               
              />
              
         
        </View>
      

    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
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