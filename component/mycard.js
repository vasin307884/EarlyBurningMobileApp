import React from 'react';
import { Text, View, FlatList, Image, Button, Picker, Modal, TouchableOpacity, StyleSheet, Linking, TouchableHighlightBase } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { Badge, withBadge } from 'react-native-elements'
import TimeAgo from 'react-native-timeago';
import { TouchableHighlight } from 'react-native-gesture-handler';

const BadgedIcon = withBadge(1)(Icon)
let Mycard = (props) => {
    //let { id, firstname, lastname, email, phone, photo } = props.items;
    let { staffid,first_name, last_name, name, phone, address, latitude, longitude, fromdate, todate, statusValue, color, lastupdate, area } = props.items;
    return (
        <View style={styles.InfoCard}>
            <View style={{alignSelf:'flex-end', position:'absolute', marginTop:10, flexDirection:'row'}}>
            <Image style={styles.Logo1}  source={require('../immg/navi.png')}/>
            <Text style={{fontSize:14, fontWeight:'bold', color:'blue', marginTop:10, marginRight:10, marginLeft:5}} onPress={() => Linking.openURL(`https://www.google.com/maps?ie=UTF8&z=13&q=${latitude},${longitude}`)}>ขอเส้นทาง</Text>
            </View>
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ชื่อผู้ส่ง : </Text>
                <Text style={styles.RequestInfo}>{name}</Text>
            </View>
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>เบอร์โทร : </Text>
                <Text style={styles.RequestInfo}>{phone}</Text>
            </View>
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ที่อยู่ : </Text>
                <Text style={styles.RequestInfo}>{address}</Text>
            </View>
            {/* <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ละติจูด : </Text>
                <Text style={styles.RequestInfo}>{latitude}</Text>
            </View>
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ลองติจูด : </Text>
                <Text style={styles.RequestInfo}>{longitude}</Text>
            </View> */}
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>วันที่ส่งมา : </Text>
                <Text style={styles.RequestInfo}>{fromdate}</Text>
            </View>
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>วันที่ดำเนินการ : </Text>
                <Text style={styles.RequestInfo}>{todate}</Text>
            </View>
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>พื้นที่(โดยประมาณ) : </Text>
                <Text style={styles.RequestInfo}>{area } ตร.ม.  |  {area / 1600} ไร่</Text>
            </View>
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>สถานะ : </Text>
                <Text style={{ color: color, fontWeight: 'bold' }}>{statusValue}</Text>
            </View>
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ผู้ดูแล : </Text>
                <Text style={{color:'blue'}}>{first_name} {last_name}</Text>
            </View>
            <View style={styles.Info}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>อัพเดทล่าสุด : </Text>
                <Text style={styles.RequestInfo}>{lastupdate}  |  </Text>
                <TimeAgo style={styles.RequestInfo} time={lastupdate} />
            </View>
            <View style={{alignItems:'center'}}>
                <Image style={styles.Logo} source={require('../immg/Editlogo.png')}/>
                <Text style={{fontSize: 16, color:'red', fontWeight:'bold', marginBottom: 10, flex: 0.5, flexDirection:'column'}}>แตะค้างเพื่ออัพเดทสถานะ</Text>
            </View>
        </View>
    );
}
export default Mycard;
const styles = StyleSheet.create({
    InfoCard:{
        marginTop: 10,
        flex: 1, 
        // borderWidth: 1, 
        borderRadius: 10,
        backgroundColor: '#ecffb3',
        shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    },
    Info:{
        flex: 1, 
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 5
    },
    RequestInfo:{
        fontSize: 17,
    },
    Logo:{
        height:40,
        width:40,
        marginBottom: 10,
        flex: 0.5, 
        flexDirection: 'column'
    },
    Logo1:{
        height:40,
        width:40,
        alignSelf:'center'
    }

});
