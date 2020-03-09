import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Picker } from 'react-native';


export default class UpdateScreen extends React.Component {

    constructor(props) {
        super(props)

            const {statusValue,color} = this.props.navigation.state.params
            const item = this.props.navigation.state.params.items
            this.state={
                ustatusValue:statusValue,
                ucolor:color,
                uitem:item,
            }
    }
    Updatestatus() {
        let myrequest = {
            id: this.props.navigation.state.params.id,
            color: this.state.ucolor,
            statusValue: this.state.ustatusValue
        }
        alert(`คุณได้อัพเดทสถานะเรียบร้อยแล้ว`);
        fetch('https://chingphaow-application.herokuapp.com/requests/update', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myrequest)
        }).then(console.log(myrequest))
        this.props.navigation.navigate('Reqlist')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text>ไอดี : {this.props.navigation.state.params.id}</Text>
                </View>
                <View>
                    <Text>สถานะ : </Text>
                    <Picker
                        selectedValue={this.state.ustatusValue}
                        onValueChange={(itemValue, itemIndex) => this.setState({ ustatusValue: itemValue })} >

                        <Picker.Item label="กำลังรอเจ้าหน้าที่ตรวจสอบ" value="กำลังรอเจ้าหน้าที่ตรวจสอบ" />
                        <Picker.Item label="กำลังดำเนินการชิงเผา" value="กำลังดำเนินการชิงเผา" />
                        <Picker.Item label="ชิงเผาเสร็จเรียบร้อยแล้ว" value="ชิงเผาเสร็จเรียบร้อยแล้ว" />

                    </Picker>
                    <Text>สี : </Text>
                    <Picker
                        selectedValue={this.state.ucolor}
                        onValueChange={(itemValue, itemIndex) => this.setState({ ucolor: itemValue })} >

                        <Picker.Item label="red" value="red" />
                        <Picker.Item label="orange" value="orange" />
                        <Picker.Item label="green" value="green" />

                    </Picker>
                </View>
                <Button
                    title="Update status"
                    onPress={() => this.Updatestatus(this.state.item)}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});