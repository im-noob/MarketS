import React, { Component } from "react";
import { 
    Dimensions,
 Picker,
    StyleSheet,
    View,
    NetInfo,
    ToastAndroid
} from "react-native";
import { CheckBox, FormLabel } from 'react-native-elements'
import Global from '../constants/Global';

import { Container, Content, List, ListItem, Button, Label, Textarea,Text , Card,Spinner,Form,Item,Input } from 'native-base'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const {height,width} = Dimensions.get('window');
export default class EditWork extends Component {
    static navigationOptions = {
        title:"Edit Work"
    };
    
    constructor(props) {
        super(props)
        var workingHour = props.navigation.getParam('workingHour', '10:00:AM-04:00:PM');
        console.log(workingHour);
        this.state = {
            expYear:props.navigation.getParam('expYear', '0'),
            StartHour:workingHour.split("-")[0].split(":")[0],
            StartMin: workingHour.split("-")[0].split(":")[1],
            startAMPM: workingHour.split("-")[0].split(":")[2],
            EndHour:workingHour.split("-")[1].split(":")[0],
            EndMin:workingHour.split("-")[1].split(":")[1],
            EndAMPM:workingHour.split("-")[1].split(":")[2],
            workType:props.navigation.getParam('workType', ''),
            renderComponentFlag:false,
            saveButtonDisable:false,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderComponentFlag: true})}, 0);
    }
    _handle_submit = () =>{
        var workingHourSend = this.state.StartHour+":"+this.state.StartMin+":"+this.state.startAMPM+"-"+this.state.EndHour+":"+this.state.EndMin+":"+this.state.EndAMPM;
        console.log(workingHourSend);
        console.log(this.state.expYear);
        console.log(this.state.workType);

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
                    workingHour:workingHourSend,
                    expYear:this.state.expYear,
                    workType:this.state.workType,
                   
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

    _renderHeader(title, expanded) {
        return (
          <View
            style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: "#A9DAD6" }}
          >
            <Text style={{ fontWeight: "600" }}>
              {" "}{title}
            </Text>
            {expanded
              ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
              : <Icon style={{ fontSize: 18 }} name="add-circle" />}
          </View>
        );
    }
    
    // _renderContent(content) {
    //     console.log("rader prob");
    //     console.log(content.content);
    //     return (
            
    //         <List dataArray={content.content}
    //         renderRow={(item) =>
    //           <ListItem style={{padding:0,margin:0}}>
    //             <CheckBox
    //             center
    //             title={item.data}
    //             checked={item.checked}
    //             />
    //           </ListItem>
    //         }>
    //       </List>
    //     );
    // }

    render() {    
    // const dataArray = [
    //     { title: "Repair", content: [
    //             {data:"Electronic appliances",id:"1",checked:true},
    //             {data:"Home wiring",id:"2",checked:true},
    //             {data:"Computer, laptops",id:"3",checked:true},
    //             {data:"Furnitures, laptops",id:"4",checked:true},
    //         ] 
    //     },
    //     { title: "Software", content: [
    //             {data:"Computer format",id:"4",checked:true},
    //             {data:"Drivers",id:"5",checked:true},
    //             {data:"Misc services",id:"6",checked:true}
    //         ] 
    //     },
    // ];
        if(this.state.renderComponentFlag){
            return (
                <Container>
                    <Content>
                    <List>
                        {/* working experience section:start */}
                        <Form>
                            <ListItem itemDivider>
                                    <Text>Working Experience</Text>
                            </ListItem>
                            <Item fixedLabel >
                                <Label>Experience(In Year)</Label>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: 120 , backgroundColor:'#eaf1f4'}}
                                    selectedValue={this.state.expYear}
                                    onValueChange={(itemValue, itemIndex) => this.setState({expYear: itemValue})}
                                    >
                                        <Picker.Item label="0" value="0" />
                                        <Picker.Item label="1" value="1" />
                                        <Picker.Item label="2" value="2" />
                                        <Picker.Item label="3" value="3" />
                                        <Picker.Item label="4" value="4" />
                                        <Picker.Item label="5" value="5" />
                                        <Picker.Item label="6" value="6" />
                                        <Picker.Item label="7" value="7" />
                                        <Picker.Item label="8" value="8" />
    
                                </Picker>
                            </Item>
                        </Form>
                        {/* working experience section:end */}
    
                        {/* workng hour section:start */}
                        <Form>
                            <ListItem itemDivider>
                                <Text>Working Hour</Text>
                            </ListItem>
                            <Item fixedLabel>
                                <Label>Start Hour</Label>
                                <Picker
                                    
                                    mode="dropdown"
                                    style={{ width: 40, height:32,backgroundColor:'#eaf1f4' ,marginRight:5}}
                                    selectedValue={this.state.StartHour}
                                    onValueChange={(itemValue, itemIndex) => this.setState({StartHour: itemValue})}
                                    >
                                        <Picker.Item label="01" value="01" />
                                        <Picker.Item label="02" value="02" />
                                        <Picker.Item label="03" value="03" />
                                        <Picker.Item label="04" value="04" />
                                        <Picker.Item label="05" value="05" />
                                        <Picker.Item label="06" value="06" />
                                        <Picker.Item label="07" value="07" />
                                        <Picker.Item label="08" value="08" />
                                        <Picker.Item label="09" value="09" />
                                        <Picker.Item label="10" value="10" />
                                        <Picker.Item label="11" value="11" />
                                        <Picker.Item label="12" value="12" />
    
                                </Picker>
                                <Text style={{marginRight:5,fontWeight:'800',fontSize:22}}>:</Text>
                                <Picker
                                    
                                    mode="dropdown"
                                    style={{  width: 40, height:32 ,backgroundColor:'#eaf1f4',marginRight:5 }}
                                    selectedValue={this.state.StartMin}
                                    onValueChange={(itemValue, itemIndex) => this.setState({StartMin: itemValue})}
                                    >
                                        <Picker.Item label="00" value="00" />
                                        <Picker.Item label="01" value="01" />
                                        <Picker.Item label="02" value="02" />
                                        <Picker.Item label="03" value="03" />
                                        <Picker.Item label="04" value="04" />
                                        <Picker.Item label="05" value="05" />
                                        <Picker.Item label="06" value="06" />
                                        <Picker.Item label="07" value="07" />
                                        <Picker.Item label="08" value="08" />
                                        <Picker.Item label="09" value="09" />
                                        <Picker.Item label="10" value="10" />
                                        <Picker.Item label="11" value="11" />
                                        <Picker.Item label="12" value="12" />
                                        <Picker.Item label="13" value="13" />
                                        <Picker.Item label="14" value="14" />
                                        <Picker.Item label="15" value="15" />
                                        <Picker.Item label="16" value="16" />
                                        <Picker.Item label="17" value="17" />
                                        <Picker.Item label="18" value="18" />
                                        <Picker.Item label="19" value="19" />
                                        <Picker.Item label="20" value="20" />
                                        <Picker.Item label="21" value="21" />
                                        <Picker.Item label="22" value="22" />
                                        <Picker.Item label="23" value="23" />
                                        <Picker.Item label="24" value="24" />
                                        <Picker.Item label="25" value="25" />
                                        <Picker.Item label="26" value="26" />
                                        <Picker.Item label="27" value="27" />
                                        <Picker.Item label="28" value="28" />
                                        <Picker.Item label="29" value="29" />
                                        <Picker.Item label="30" value="30" />
                                        <Picker.Item label="31" value="31" />
                                        <Picker.Item label="32" value="32" />
                                        <Picker.Item label="33" value="33" />
                                        <Picker.Item label="33" value="33" />
                                        <Picker.Item label="35" value="35" />
                                        <Picker.Item label="36" value="36" />
                                        <Picker.Item label="37" value="37" />
                                        <Picker.Item label="38" value="38" />
                                        <Picker.Item label="39" value="39" />
                                        <Picker.Item label="40" value="40" />
                                        <Picker.Item label="41" value="41" />
                                        <Picker.Item label="42" value="42" />
                                        <Picker.Item label="43" value="43" />
                                        <Picker.Item label="44" value="44" />
                                        <Picker.Item label="45" value="45" />
                                        <Picker.Item label="46" value="46" />
                                        <Picker.Item label="47" value="47" />
                                        <Picker.Item label="48" value="48" />
                                        <Picker.Item label="49" value="49" />
                                        <Picker.Item label="50" value="50" />
                                        <Picker.Item label="51" value="51" />
                                        <Picker.Item label="52" value="52" />
                                        <Picker.Item label="53" value="53" />
                                        <Picker.Item label="54" value="54" />
                                        <Picker.Item label="55" value="55" />
                                        <Picker.Item label="56" value="56" />
                                        <Picker.Item label="57" value="57" />
                                        <Picker.Item label="58" value="58" />
                                        <Picker.Item label="59" value="59" />
                                </Picker>
                                <Picker
                                    
                                    mode="dropdown"
                                    style={{  width: 50, height:32 ,backgroundColor:'#eaf1f4' }}
                                    selectedValue={this.state.startAMPM}
                                    onValueChange={(itemValue, itemIndex) => this.setState({startAMPM: itemValue})}
                                    >
                                        <Picker.Item label="AM" value="AM" />
                                        <Picker.Item label="PM" value="PM" />
                                </Picker>
    
                            </Item>
                            <Item fixedLabel>
                                <Label>End Hour</Label>
                                <Picker
                                    
                                    mode="dropdown"
                                    style={{ width: 40, height:32,backgroundColor:'#eaf1f4' ,marginRight:5}}
                                    selectedValue={this.state.EndHour}
                                    onValueChange={(itemValue, itemIndex) => this.setState({EndHour: itemValue})}
                                    >
                                        <Picker.Item label="01" value="01" />
                                        <Picker.Item label="02" value="02" />
                                        <Picker.Item label="03" value="03" />
                                        <Picker.Item label="04" value="04" />
                                        <Picker.Item label="05" value="05" />
                                        <Picker.Item label="06" value="06" />
                                        <Picker.Item label="07" value="07" />
                                        <Picker.Item label="08" value="08" />
                                        <Picker.Item label="09" value="09" />
                                        <Picker.Item label="10" value="10" />
                                        <Picker.Item label="11" value="11" />
                                        <Picker.Item label="12" value="12" />
    
                                </Picker>
                                <Text style={{marginRight:5,fontWeight:'800',fontSize:22}}>:</Text>
                                <Picker
                                    
                                    mode="dropdown"
                                    style={{  width: 40, height:32 ,backgroundColor:'#eaf1f4',marginRight:5 }}
                                    selectedValue={this.state.EndMin}
                                    onValueChange={(itemValue, itemIndex) => this.setState({EndMin: itemValue})}
                                    >
                                        <Picker.Item label="00" value="00" />
                                        <Picker.Item label="01" value="01" />
                                        <Picker.Item label="02" value="02" />
                                        <Picker.Item label="03" value="03" />
                                        <Picker.Item label="04" value="04" />
                                        <Picker.Item label="05" value="05" />
                                        <Picker.Item label="06" value="06" />
                                        <Picker.Item label="07" value="07" />
                                        <Picker.Item label="08" value="08" />
                                        <Picker.Item label="09" value="09" />
                                        <Picker.Item label="10" value="10" />
                                        <Picker.Item label="11" value="11" />
                                        <Picker.Item label="12" value="12" />
                                        <Picker.Item label="13" value="13" />
                                        <Picker.Item label="14" value="14" />
                                        <Picker.Item label="15" value="15" />
                                        <Picker.Item label="16" value="16" />
                                        <Picker.Item label="17" value="17" />
                                        <Picker.Item label="18" value="18" />
                                        <Picker.Item label="19" value="19" />
                                        <Picker.Item label="20" value="20" />
                                        <Picker.Item label="21" value="21" />
                                        <Picker.Item label="22" value="22" />
                                        <Picker.Item label="23" value="23" />
                                        <Picker.Item label="24" value="24" />
                                        <Picker.Item label="25" value="25" />
                                        <Picker.Item label="26" value="26" />
                                        <Picker.Item label="27" value="27" />
                                        <Picker.Item label="28" value="28" />
                                        <Picker.Item label="29" value="29" />
                                        <Picker.Item label="30" value="30" />
                                        <Picker.Item label="31" value="31" />
                                        <Picker.Item label="32" value="32" />
                                        <Picker.Item label="33" value="33" />
                                        <Picker.Item label="33" value="33" />
                                        <Picker.Item label="35" value="35" />
                                        <Picker.Item label="36" value="36" />
                                        <Picker.Item label="37" value="37" />
                                        <Picker.Item label="38" value="38" />
                                        <Picker.Item label="39" value="39" />
                                        <Picker.Item label="40" value="40" />
                                        <Picker.Item label="41" value="41" />
                                        <Picker.Item label="42" value="42" />
                                        <Picker.Item label="43" value="43" />
                                        <Picker.Item label="44" value="44" />
                                        <Picker.Item label="45" value="45" />
                                        <Picker.Item label="46" value="46" />
                                        <Picker.Item label="47" value="47" />
                                        <Picker.Item label="48" value="48" />
                                        <Picker.Item label="49" value="49" />
                                        <Picker.Item label="50" value="50" />
                                        <Picker.Item label="51" value="51" />
                                        <Picker.Item label="52" value="52" />
                                        <Picker.Item label="53" value="53" />
                                        <Picker.Item label="54" value="54" />
                                        <Picker.Item label="55" value="55" />
                                        <Picker.Item label="56" value="56" />
                                        <Picker.Item label="57" value="57" />
                                        <Picker.Item label="58" value="58" />
                                        <Picker.Item label="59" value="59" />
                                </Picker>
                                <Picker
                                    
                                    mode="dropdown"
                                    style={{  width: 50, height:32 ,backgroundColor:'#eaf1f4' }}
                                    selectedValue={this.state.EndAMPM}
                                    onValueChange={(itemValue, itemIndex) => this.setState({EndAMPM: itemValue})}
    
                                    >
                                        <Picker.Item label="AM" value="AM" />
                                        <Picker.Item label="PM" value="PM" />
                                </Picker>
    
                            </Item>
                        </Form>
                        {/* workng hour section:end */}
    
                    </List>
    
                    {/* Working Detailis:start */}
                    <View style={{marginVertical:10}}>
                        <ListItem itemDivider>
                            <Text>Type your work seprated by Comma ( , )</Text>
                        </ListItem>
                        <Textarea 
                            rowSpan={5} 
                            bordered 
                            placeholder="Type your work type sperated by ," 
                            style={{backgroundColor:'#eaf1f4',marginVertical:10,marginHorizontal:6}}  
                            value={this.state.workType}
                            onChangeText = {(text) => { this.setState({workType:text});}}
    
                        />
                    </View>
                    {/* working details:end */}
                    <Card>
                        <Button block dark onPress={()=>{this._handle_submit()}} disabled={this.state.saveButtonDisable}>
                            <Text>Save</Text>
                        </Button>
                    </Card>
                    
                      
                        
    
                    
    
                    
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
});
