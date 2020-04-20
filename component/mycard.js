import React from 'react';
import { Text, View, FlatList, Image, Button, Picker, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { Badge,withBadge} from 'react-native-elements'
import TimeAgo from 'react-native-timeago';

const BadgedIcon = withBadge(1)(Icon)
let Mycard = (props) => {
    //let { id, firstname, lastname, email, phone, photo } = props.items;
    let { id,name, phone, address, latitude, longitude, fromdate, todate, statusValue, color, lastupdate, area } = props.items;
    return (
        <View style={{ flex: 1, marginTop: 2, borderWidth: 0.5, borderRadius: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ชื่อผู้ส่ง : </Text>
                <Text>{name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>เบอร์โทร : </Text>
                <Text>{phone}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ที่อยู่ : </Text>
                <Text>{address}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ละติจูด : </Text>
                <Text>{latitude}</Text>
                <Text style={{ paddingLeft: 80 }}>>>>กดค้างเพื่ออัพเดทสถานะ</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ลองติจูด : </Text>
                <Text>{longitude}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>วันที่ส่งมา : </Text>
                <Text>{fromdate}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>วันที่เริ่ม : </Text>
                <Text>{todate}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>พื้นที่(โดยประมาณ) : </Text>
                <Text>{area} ตร.ม.  |  {area / 1600} ไร่</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>สถานะ : </Text>
                <Text style={{ color: color, fontWeight: 'bold' }}>{statusValue}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>อัพเดทล่าสุด : </Text>
                <Text>{lastupdate}  |  </Text>
                <TimeAgo time={lastupdate} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 5}}>
            <Icon name="plus" size={30} color='black'/>
                <TouchableOpacity>
                <Badge value={<Text>เพิ่มเข้าไปในลิสต์ของฉัน</Text>} status="success" />
                </TouchableOpacity>
            </View>
            
            
        </View>
    );
}
export default Mycard;
