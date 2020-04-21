import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Picker, AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode'
// let updatedate = new Date();
export default class UpdateScreen extends React.Component {
    constructor(props) {
        super(props)
        const { statusValue, color } = this.props.navigation.state.params
        const item = this.props.navigation.state.params.items
        this.state = {
            ustatusValue: statusValue,
            ucolor: color,
            uitem: item,
            id: ''

        }
    }
    getWeather() {
        Mycity = "Chiang Rai"
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&appid=06221fc99afc08d9030d60c36b98c60e`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    info: {
                        name: data.name,
                        temp: data.main.temp,
                        humidity: data.main.humidity,
                        wind: data.wind.speed,
                        desc: data.weather[0].description,
                        icon: data.weather[0].icon
                    }
                })
            }).catch(err => {
                Alert.alert("Error" + err.message + "โปรดเช็คการเชื่อมต่อเน็ตของท่าน", [{ text: "OK" }])
            })
    }
    loadInitialState = async () => {
        const token = await AsyncStorage.getItem('usertoken');
        const decoded = jwt_decode(token)
        this.setState({
            id: decoded.id
        })
        console.log(decoded);
    }
    Updatestatus() {
        let myrequest = {
            id: this.props.navigation.state.params.id,
            staffid: this.state.id,
            color: this.state.ucolor,
            statusValue: this.state.ustatusValue,
            lastupdate: this.state.updatedate
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
    componentDidMount() {
        this.loadInitialState().done();
        this.getWeather()
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        this.setState({
            updatedate:
                year + '/' + month + '/' + date + ' ' + hours + ':' + min + ':' + sec,
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text>รีเควสไอดี : {this.props.navigation.state.params.id}</Text>
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
                <View>
                    <Text>{this.state.updatedate}</Text>
                </View>
                <Button
                    title="Update status"
                    onPress={() => {
                        if (this.state.info.temp > 30 || this.state.info.wind > 1.6 || this.state.info.humidity < 65) {
                            alert("ไม่สามารถอัพเดทสถานะได้ในขณะนี้ กรุณาเช็คอุณหภูมิ,ความแรงลมและความชื้นอีกครั้ง");
                            return;
                        }
                        else if (this.state.id != this.props.navigation.state.params.staffid && this.props.navigation.state.params.staffid != null) {
                            alert("ขออภัย , จุดนี้มีเจ้าหน้าที่คนอื่นดูแลอยู่แล้ว")
                            return;
                        }
                        this.Updatestatus(this.state.item)
                            return;
                        }
                    }
                 
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