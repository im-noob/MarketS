import React, { Component } from "react";
import { 
    Dimensions,
    Picker,
    StyleSheet,
    View,
    NetInfo,
    ToastAndroid
} from "react-native";
import { Container, Content, Form, Item, Label, Input, Textarea, Button,Text ,Spinner, Left, Right } from 'native-base'
import Global from '../constants/Global';

const {height,width} = Dimensions.get('window');

export default class EditProfile extends Component {
    static navigationOptions = {
        title:"Edit Profile",
      };
        
    constructor(props) {
        super(props);
        
        this.state = {
            state:props.navigation.getParam('state', 'state'),
            name:props.navigation.getParam('name', 'name'),
            phoneno:props.navigation.getParam('phoneno', 'phoneno'),
            city:props.navigation.getParam('city', 'city'),
            pincode:props.navigation.getParam('pincode', 'pincode'),
            address:props.navigation.getParam('address', 'address'),
            renderComponentFlag:false,
            saveButtonDisable:false,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderComponentFlag: true})}, 0);
    }
    _handle_submit = () =>{
        console.log(this.state.name);
        console.log(this.state.phoneno);
        console.log(this.state.city);
        console.log(this.state.pincode);
        console.log(this.state.address);
        console.log(this.state.state);

        // checking net and sending data
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
        console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        if(connectionInfo.type == 'none'){
            console.log("no internet ");
            ToastAndroid.showWithGravityAndOffset(
            'Oops! No Internet Connection',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
            );
            
        }else{
            console.log("yes internet ");
            this.setState({saveButtonDisable:true})
            fetch(Global.API_URL+'updateProfileInfo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI5NjQyMmFlMDc2NTdlZjhjNWFmNzRjYWNlZDg1ODkxOWRkYjFhNWE5NWM0YWJiZjVmMGVmY2MxZThiZDk5Y2ZhMDcxZGUyODJmOWFmYWRhIn0.eyJhdWQiOiIxIiwianRpIjoiMjk2NDIyYWUwNzY1N2VmOGM1YWY3NGNhY2VkODU4OTE5ZGRiMWE1YTk1YzRhYmJmNWYwZWZjYzFlOGJkOTljZmEwNzFkZTI4MmY5YWZhZGEiLCJpYXQiOjE1NDExODAxNTEsIm5iZiI6MTU0MTE4MDE1MSwiZXhwIjoxNTcyNzE2MTUxLCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.qGTitB2xSrROQFp_77V9guBFjcmY5FHUMizq4rMoMJxR22rFOQOLH_yi1mXlbSQ5dD5R5mSymrB3TRByvnhu95MJk3TWPRU66susL8yyV3nHA_aOMEpVNon1WinsFP4b7YQDOtgC4fa9yrxDE9KxdSU0WpQ-GxG9XCRJeudXhxYEAnBWwjmWdd7g-nidqsQUmnmjF_opI9TPXG7bbCUQjl5fO5Y7AHmS-qOhanpBL6eKFoRp9-aJtnIFofVAtCnS3hElvAhhNXgVdH0hp__f1O-y34qz_OIYI9EWUV3PpdZy_Rd-tAZW05-XHbzBykYlH13U4n7ViXtbiFmTuXmBP3amXrZB09zA_hGTB1fAYEsqNDQXgGDBc4T4ueeH6wGSaSVt3k1AfZmKCU7nNj8I6hHJ_fkeT795PQ-_UKK8c8P06xRy-YtSJMfvvOS08Vd3VDIAf0BOEreiX1EfSRBfov43KpDFuIvDtuKX50Vssxuv2NxGalGHapJLzKSm4xz9iJtKRcS_qQaGos_Xddu1Fy-w5s1FPkz0GTiY1HLxSag-44PfmKgRNQbgm7O6now6R2duVbqWkv05VngR3QnFG4pjDKH4kxRFFTUEXcmyGHrKpcodohK1QdpIz80N-vESf11tqFb5xcWKgqKPNN0Zsru1OuN05_e2tQ5GGuA3mJU',
                },
                body: JSON.stringify({
                    name:this.state.name,
                    phoneno:this.state.phoneno,
                    city:this.state.city,
                    pincode:this.state.pincode,
                    address:this.state.address,
                    state:this.state.state,
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log("resp:",responseJson);
                
                var itemsToSet = responseJson.data; 
                if(responseJson.data == "saved"){
                    ToastAndroid.showWithGravityAndOffset(
                        'Sucessfully Saved!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                }
                this.setState({
                    saveButtonDisable:false,
                });
            }).catch((error) => {
                alert("slow network");
                console.log("on error featching:"+error);
                this.setState({
                    saveButtonDisable:false,
                });
            });
        }
        });
        console.log(connectionInfoLocal);
        
    }
    render() {
       if(this.state.renderComponentFlag){
        return (
                <Container>
                    <Content>
                        <Form>
                            <Item floatingLabel style = {styles.item}>
                                <Label>Name</Label>
                                <Input 
                                    onChangeText = {(text) => { this.setState({name:text});}}
                                    value = {this.state.name}
                                />
                            </Item>
                            <Item floatingLabel style = {styles.item}>
                                <Label>Phone No</Label>
                                <Input 
                                    onChangeText = {(text) => { this.setState({phoneno:text});}}
                                    value = {this.state.phoneno}
                                />
                            </Item>
                            <Item floatingLabel style = {styles.item}>
                                <Label>City</Label>
                                <Input 
                                    onChangeText = {(text) => { this.setState({city:text});}}
                                    value = {this.state.city}
                                />
                            </Item>
                            <Item floatingLabel style = {styles.item}>
                                <Label>PinCode</Label>
                                <Input 
                                    onChangeText = {(text) => { this.setState({pincode:text});}}
                                    value = {this.state.pincode}
                                />
                            </Item>
                            <Item style = {styles.item}>
                                <Label>Address:</Label>
                                <Textarea rowSpan={3} bordered style={{width:width*(3/4)}} 
                                    onChangeText = {(text) => { this.setState({address:text});}}
                                    value = {this.state.address}
                                />
                            </Item>
                            <Item style = {styles.item}>
                                <Label>State</Label>
                                <Right>
                                <Picker
                                    selectedValue={this.state.state}
                                    style={{ height: 50, width: width*(3/4) , backgroundColor:'#eaf1f4' }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({state: itemValue})}>
                                    <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
                                    <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
                                    <Picker.Item label="Assam" value="Assam" />
                                    <Picker.Item label="Bihar" value="Bihar" />
                                    <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
                                    <Picker.Item label="Goa" value="Goa" />
                                    <Picker.Item label="Gujarat" value="Gujarat" />
                                    <Picker.Item label="Haryana" value="Haryana" />
                                    <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
                                    <Picker.Item label="Jammu & Kashmir" value="Jammu & Kashmir" />
                                    <Picker.Item label="Jharkhand" value="Jharkhand" />
                                    <Picker.Item label="Karnataka" value="Karnataka" />
                                    <Picker.Item label="Kerala" value="Kerala" />
                                    <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
                                    <Picker.Item label="Maharashtra" value="Maharashtra" />
                                    <Picker.Item label="Manipur" value="Manipur" />
                                    <Picker.Item label="Meghalaya" value="Meghalaya" />
                                    <Picker.Item label="Mizoram" value="Mizoram" />
                                    <Picker.Item label="Nagaland" value="Nagaland" />
                                    <Picker.Item label="Odisha" value="Odisha" />
                                    <Picker.Item label="Punjab" value="Punjab" />
                                    <Picker.Item label="Rajasthan" value="Rajasthan" />
                                    <Picker.Item label="Sikkim" value="Sikkim" />
                                    <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
                                    <Picker.Item label="Telangana" value="Telangana" />
                                    <Picker.Item label="Tripura" value="Tripura" />
                                    <Picker.Item label="Uttarakhand" value="Uttarakhand" />
                                    <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                                    <Picker.Item label="West Bengal" value="West Bengal" />

                                </Picker>
                                </Right>
                            </Item>
                            
                            <Button block bordered disabled={this.state.saveButtonDisable} style={{ margin:20}} onPress={() =>{this._handle_submit()}}>
                                <Text>Save</Text>
                            </Button>
                            
                            
                        </Form>
                    </Content>
                </Container>
            );
       }else{
            return (
                <View style={styles.loder}>
                <Spinner  color='blue'/>
                </View>
            );
       }
        
    }
}

/*
    name
    phoneno
    state
    city
    pincode
    address
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item:{
       paddingTop: 5,
    }
});