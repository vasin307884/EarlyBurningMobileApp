import React from 'react';
import { Text, View, FlatList, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Ionicons'
const Mycard = (props) => {
    //let { id, firstname, lastname, email, phone, photo } = props.items;
    let {id,name,phone,address,latitude,longitude,statusValue,fromdate,todate,color} = props.items;
    return (
        <View style={{ flex: 1,marginTop:2,borderWidth:0.5,borderRadius:20 }}>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>ชื่อผู้ส่ง : </Text>
            <Text>{name}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>เบอร์โทร : </Text>
            <Text>{phone}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>ที่อยู่ : </Text>
            <Text>{address}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>ละติจูด : </Text>
            <Text>{latitude}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>ลองติจูด : </Text>
            <Text>{longitude}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>วันที่ส่งมา : </Text>
            <Text>{fromdate}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>วันที่เริ่ม : </Text>
            <Text>{todate}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={{ fontSize: 16,fontWeight:'bold' }}>สถานะ : </Text>
            <Text style={{color:color,fontWeight:'bold'}}>{statusValue}</Text>
            </View>
            </View>
    );
    }
export default Mycard;

