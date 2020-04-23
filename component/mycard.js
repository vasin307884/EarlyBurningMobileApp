import React from 'react';
import { Text, View, FlatList, Image, Button, Picker, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { Badge, withBadge } from 'react-native-elements'
import TimeAgo from 'react-native-timeago';

const BadgedIcon = withBadge(1)(Icon)
let Mycard = (props) => {
    //let { id, firstname, lastname, email, phone, photo } = props.items;
    let { staffid, name, phone, address, latitude, longitude, fromdate, todate, statusValue, color, lastupdate, area } = props.items;
    let { staffid, name, phone, address, latitude, longitude, fromdate, todate, statusValue, color, lastupdate, area, first_name, last_name } = props.items;
    return (
        <View style={{ flex: 1, marginTop: 2, borderWidth: 0.5, borderRadius: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text>{lastupdate}  |  </Text>
                <TimeAgo time={lastupdate} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>เจ้าหน้าที่ที่ดูแล: </Text>
                <Text style={{ color: 'blue', fontWeight: 'bold' }}>{first_name} {last_name}</Text>
            </View>


        </View>
    );
}
export default Mycard;
