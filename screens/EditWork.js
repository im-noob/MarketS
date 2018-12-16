import React, { Component } from "react";
import { 
    Picker,
    StyleSheet,
    Linking ,
    Dimensions,
    Platform,
    NetInfo,
    View,
    ToastAndroid,
    TouchableOpacity,
    Modal,
    ScrollView,
    AsyncStorage,
} from "react-native";
import { CheckBox, FormLabel } from 'react-native-elements'
import Global from '../constants/Global';

import {  Card,Container, Spinner,List,ListItem,Text,Content,Button,Item,Input,Form,Label } from 'native-base'
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
            workList:props.navigation.getParam('workList', []),
            renderComponentFlag:false,
            saveButtonDisable:false,
            AddWorkVisible:false,
            addWorkCost:'',
            addWorkType:'',
            cat_subcat_data : [
                {
                    category:'computer',subcategory:[
                        {value:'Hard Disk1',key:'11'},
                        {value:'CUP finshing1',key:'12'},
                        {value:'Fan reparing1',key:'13'},
                        {value:'Mother Board repring1',key:'14'},
                        {value:'Spari part reparing1',key:'15'},
                    ],
                },
                {
                    category:'Tranport',subcategory:[
                        {value:'Hard Disk2',key:'16'},
                        {value:'CUP finshing2',key:'17'},
                        {value:'Fan reparing2',key:'18'},
                        {value:'Mother Board repring2',key:'19'},
                        {value:'Spari part reparing2',key:'20'},
                    ],
                },
                {
                    category:'Electrics',subcategory:[
                        {value:'Hard Disk3',key:'21'},
                        {value:'CUP finshing3',key:'22'},
                        {value:'Fan reparing3',key:'23'},
                        {value:'Mother Board repring3',key:'24'},
                        {value:'Spari part reparing',key:'25'},
                    ],
                },
                {
                    category:'vechical',subcategory:[
                        {value:'Hard Disk4',key:'26'},
                        {value:'CUP finshing4',key:'27'},
                        {value:'Fan reparing4',key:'28'},
                        {value:'Mother Board repring4',key:'29'},
                        {value:'Spari part reparing4',key:'30'},
                    ],
                }
            ],
            SelectedCategory:'0',
            SelectedCategorykey:'0',
            SelectedSubCategory:'0',
            subcategory_key:'0'

        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderComponentFlag: true})}, 0);
    }
    _handle_submit = async () =>{
        var KEY = await AsyncStorage.getItem('userToken');
        var userID = await AsyncStorage.getItem('userID');

        var workingHourSend = this.state.StartHour+":"+this.state.StartMin+":"+this.state.startAMPM+"-"+this.state.EndHour+":"+this.state.EndMin+":"+this.state.EndAMPM;
        console.log(workingHourSend);
        console.log(this.state.expYear);
        console.log(this.state.workList);

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
            fetch(Global.API_URL+'updateWorkInfo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization':'Bearer '+KEY,
                },
                body: JSON.stringify({
                    workingHour:workingHourSend,
                    expYear:this.state.expYear,
                    workList:this.state.workList,
                    userID:userID,
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log("resp:",responseJson);
                
                var itemsToSet = responseJson.data; 
                if(responseJson.data == "saved"){
                    this._getData();
                    ToastAndroid.showWithGravityAndOffset(
                        'Sucessfully Saved!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                }else{
                    alert("Internal Server Error 5000")
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
    _getData = async () =>{
        var workingHour = this.state.StartHour+":"+this.state.StartMin+":"+this.state.startAMPM+"-"+this.state.EndHour+":"+this.state.EndMin+":"+this.state.EndAMPM; //10:00:AM-04:00:PM
        var oldProfileData = JSON.parse(await AsyncStorage.getItem('userProfileData'));
        // console.log('old data -----------------------------------J>');        
        // console.log(oldProfileData);
        oldProfileData.items0 = this.state.workList;
        oldProfileData.items1 = [
            {"A": "Work Experience(In year)","B": this.state.expYear,},
            {"A": "Working Hour","B": workingHour,},
        ];

        // console.log('new data -----------------------------------J>');        
        // console.log(oldProfileData);
        this._setData(JSON.stringify(oldProfileData));
    }
    _setData = async($data) =>{
        // console.log('new stinrg data-----------------------------------J>');        
        // console.log($data);
        await AsyncStorage.setItem('userProfileData', $data);
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
    _remove_list_item = (item) =>{
        var arr = this.state.workList;
        console.log("in delt list");
        console.log(arr);
        var indexOf = -1;
        // var index = arr.array1.forEach(function(element,index) {
        for(var i = 0 ; i < arr.length; i ++)
            if(arr[i].list_id == item)
              indexOf = i;
        
        console.log("index",indexOf);
        arr.splice(indexOf,1);
        console.log("after remeoing list ",arr);
        // temparr.push();
        // this.setState({AddListSendBillVisible:false,BillList:arr});
        this.setState({AddWorkVisible:false,workList:[]});
        setTimeout(()=>{this.setState({workList:arr});},0);
        // var arrC = arr;
        // this.setState({AddListSendBillVisible:false,BillList:arrC});
        
        console.log("this is final",this.state.workList,arr);
    }
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
        var cat_subcat_data = this.state.cat_subcat_data;

        var SelectedCategorykey = this.state.SelectedCategorykey;
        console.log("selectec aeegor key"+SelectedCategorykey);
        var sub_category_list_arr = this.state.cat_subcat_data[SelectedCategorykey].subcategory;

        let category_list = cat_subcat_data.map( (s, i) => {
            return <Picker.Item key={i} value={s.category} label={s.category} />
        });
        let sub_category_list = sub_category_list_arr.map((value,key)=>{
            return <Picker.Item key={value.key} value={value.value} label={value.value}/>
        })

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
                            <Text>Type your work and min-max cost seprated by dash ( - )</Text>
                        </ListItem>
                        {/* <Textarea 
                            rowSpan={5} 
                            bordered 
                            placeholder="Type your work type sperated by ," 
                            style={{backgroundColor:'#eaf1f4',marginVertical:10,marginHorizontal:6}}  
                            value={this.state.workList}
                            onChangeText = {(text) => { this.setState({workList:text});}}
    
                        /> */}
                        <View style={{flexDirection:'row',padding:4,paddingHorizontal:10,}}>
                            <Text style={{margin:10,flex:1,fontSize:24}}>Work List</Text>
                            <Button rounded warning transparent 
                                style={{flex:1,borderBottomColor:'red',borderWidth:1}}
                                onPress={()=>{
                                  this.setState({AddWorkVisible:true,addWorkType:'',addWorkCost:''})
                                }}
                            ><Text>Add List</Text></Button>
                        </View>
                        <ScrollView>
                          <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                              <List dataArray={this.state.workList}
                                renderRow={(item) =>
                                  <ListItem style={{flexDirection:'row'}}>
                                    <Text style={{flex:5}}>{item.work}</Text>
                                    <Text style={{flex:5,alignSelf:'center'}}>{item.price}</Text>
                                    <TouchableOpacity onPress={()=>{
                                        this._remove_list_item(item.list_id);
                                        this.setState({AddWorkVisible:true,addWorkType:item.work,addWorkCost:item.price});
                                    }}><Icon style={{flex:2,fontSize:25}} name='pencil'/></TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{
                                        this._remove_list_item(item.list_id);
                                    }}><Icon style={{flex:2,fontSize:25}} name='window-close'/></TouchableOpacity>
                                  </ListItem>
                                }>
                              </List>
                          </View>
                        </ScrollView>
                    </View>
                    {/* working details:end */}
                    <Card>
                        <Button block dark onPress={()=>{this._handle_submit()}} disabled={this.state.saveButtonDisable}>
                            <Text>Save</Text>
                        </Button>
                    </Card>

                      
                        
    
                    
    
                    
                    </Content>
                    {/* add list send bill Model */}
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.AddWorkVisible}
                        onRequestClose={() => {
                            this.setState({
                                AddWorkVisible:false
                            })
                        }}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',backgroundColor:'#111111d6'}}>
                            <View style={{ width: width*(0.95), height: 300,backgroundColor:"#ffffff"}}>
                                <TouchableOpacity onPress={()=>{this.setState({AddWorkVisible:false})}}>
                                    <Icon name="close-circle-outline" style={{alignSelf:'flex-end',fontSize:30}}/>
                                </TouchableOpacity>
                                <Text style={{fontSize:30,alignSelf:'center'}}>Add List</Text>
                        
                                <ScrollView>
                                <View style={{ width: width*(0.95), alignSelf:'center',marginVertical:5}}>
                                    <Form>
                                        <Item inlineLabel>
                                            <Label style={{color:'#ff5722'}}>Category</Label>
                                            <Picker
                                                
                                                mode="dropdown"
                                                style={{  width: '70%', height:32 }}
                                                selectedValue={this.state.SelectedCategory}
                                                onValueChange={(itemValue, itemIndex) => this.setState({SelectedCategory: itemValue,SelectedCategorykey:itemIndex})}
                                                >
                                                {category_list}
                                                    
                
                                            </Picker>
                    
                                        </Item>
                                        <Item inlineLabel>
                                            <Label style={{color:'#ff5722'}}>Sub Cate.</Label>
                                            <Picker
                                                mode="dropdown"
                                                style={{  width: '70%',  }}
                                                selectedValue={this.state.SelectedSubCategory}
                                                onValueChange={(itemValue, itemIndex) => this.setState({SelectedSubCategory: itemValue,subcategory_key:itemIndex})}
                                                >
                                                {sub_category_list}
                                            </Picker>
                                        </Item>
                                        <Item inlineLabel last>
                                            <Label style={{color:'#ff5722'}}>Cost</Label>
                                            <Input
                                                style={{marginRight:30}} 
                                                underlineColorAndroid='black'
                                                onChangeText={(text)=>{this.setState({addWorkCost:text})}}
                                                keyboardType='numeric'
                                                value={this.state.addWorkCost}
                                                placeholder="Min-Max rate like(200-500)"
                                            />
                                        </Item>
                                    </Form>
                                </View>
                                </ScrollView>
                                <View style={{alignContent:'flex-end',flexDirection:'row',alignItems:'flex-end',alignSelf:'flex-end'}}>
                                    <Button transparent onPress={()=>{this.setState({AddWorkVisible:false})}}><Text>Cancle</Text></Button>
                                    <Button transparent onPress={()=>{

                                        var temparr = this.state.workList;
                                        console.log("worklist",this.state.workList);
                                        temparr.push({work:this.state.subcategory_key,price:this.state.addWorkCost,list_id:temparr.length+1});
                                        this.setState({AddWorkVisible:false,workList:temparr})
                                    }}><Text>Add</Text></Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    {/* 
                    * we can impove add send bill for particular use using 2-d array 
                    */}
                    {/* add list SendBill modal end */}
            
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
