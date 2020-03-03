import React from 'react';
import { Text, View, FlatList, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Ionicons'
const Mycard = (props) => {
    //let { id, firstname, lastname, email, phone, photo } = props.items;
    let {id,name,phone,address,latitude,longitude,statusValue} = props.items;
    return (
        <View style={{ flex: 1,marginTop:2,borderWidth:0.5,borderRadius:20 }}>
            <View style={{flex:1}}>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>ชื่อผู้ส่ง : {name}</Text>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>เบอร์โทร : {phone}</Text>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>ที่อยู่ : {address}</Text>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>ละติจูด : {latitude}</Text>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>ลองติจูด : {longitude}</Text>
            <Text style={{ fontSize: 16,fontWeight:'bold',color:'red' }}>สถานะ : {statusValue}</Text>
            </View>
        </View>
    );
    }
export default Mycard;

