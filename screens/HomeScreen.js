import React from 'react';
import {
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
} from "react-native";
import { Container, Spinner,List,ListItem, Text,Content,Left,Right,Body,Thumbnail,Button,Item,Input,Form,Label} from 'native-base';
import Icon  from 'react-native-vector-icons/Feather';    
import {Divider  } from 'react-native-elements';
import Global from '../constants/Global';
const {width,height} = Dimensions.get('window');
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Incoming Request",
    // backgroundColor:'#4285f4',
    // color:'#4285f4',
  };

  constructor(props){
    super(props);
    this.state = {
        renderComponentFlag: false,
        item:[],
        
      }
  }
  componentDidMount() {
      setTimeout(() => {this.setState({renderComponentFlag: true})}, 0);
  }
  
    render() {
      const {renderComponentFlag,} = this.state;
      // Data
      
      if(renderComponentFlag){
          return(
              <Container>
                  <Content>
                      <ListRender/>
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

class ListRender extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        connectionInfo:'',
        renderContentFlag:false,
        loading:true,
        SendBillVisible:false,
        ViewRequet:false,
        AddListSendBillVisible:false,
        sendBillTo_ID:'',
        openViewRequest_ID:'',
        addListTitle:'',
        addListCost:'',
        BillList:[
          {work:'A',price:'100',list_id:'1'},
          {work:'B',price:'200',list_id:'2'},
          {work:'C',price:'300',list_id:'3'},
          {work:'D',price:'400',list_id:'4'},
          {work:'E',price:'500',list_id:'5'},
          {work:'F',price:'600',list_id:'6'},
          {work:'G',price:'700',list_id:'7'},
          {work:'H',price:'800',list_id:'8'},
          {work:'I',price:'900',list_id:'9'},
          {work:'J',price:'1000',list_id:'10'},
       ],
      }
  }
  componentDidMount(){
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      this.setState({
        connectionInfo:connectionInfo.type
      })
    });
    NetInfo.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
    this.renderData();
  }
   handleConnectivityChange = (connectionInfo) => {
    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    this.setState({
      connectionInfo:connectionInfo.type
    })
  }
  
  _handleCall = (str) => {
    console.log(this.state.connectionInfo);
    var phoneString = str.replace(/-/g, "");
    //console.log(phoneString);
    
    Linking.openURL(`tel:${phoneString}`);
  }
  renderData = () => {
    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      connectionInfo.type = 'none';//force local loding
      if(connectionInfo.type == 'none'){
        console.log("no internet ");
        
        ToastAndroid.showWithGravityAndOffset(
          'Oops! No Internet Connection',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        var itemsToSet =  [
          {req_id:'1', clint_name:'Donald Trump',work_type:'Car Reparing',date:'28 Nov 2018 11:24 AM',contactNo:"8340669783",Message:'please repair my car',avtar_url:'https://instagram.fpat1-1.fna.fbcdn.net/vp/6d5170dcf49f011a0c016d4b572543d8/5C662705/t51.2885-19/s150x150/23823676_515039535523575_7479748231031685120_n.jpg'},
          {req_id:'2', clint_name:'Akshay Kumar',work_type:'Laptop Reparing',date:'25 Nov 2018 2:38 PM',contactNo:"8340669783",Message:'please repair my Laptop its HDD might be corrupt so come one 1 TB HP HDD so i can replace it... and also come with data recovery tool.. okay... come fast its necessery .. . tks in advance .',avtar_url:'https://instagram.fpat1-1.fna.fbcdn.net/vp/ee936c0c7ea5ed553dc0be21928327b6/5C7C4289/t51.2885-19/s150x150/17265645_1686057661694242_1994307655182581760_a.jpg'},
        ];
        this.setState({items:itemsToSet,loading:false});
        return;
        
      }else{
        console.log("yes internet ");
        fetch(Global.API_URL+'incoming_request', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI5NjQyMmFlMDc2NTdlZjhjNWFmNzRjYWNlZDg1ODkxOWRkYjFhNWE5NWM0YWJiZjVmMGVmY2MxZThiZDk5Y2ZhMDcxZGUyODJmOWFmYWRhIn0.eyJhdWQiOiIxIiwianRpIjoiMjk2NDIyYWUwNzY1N2VmOGM1YWY3NGNhY2VkODU4OTE5ZGRiMWE1YTk1YzRhYmJmNWYwZWZjYzFlOGJkOTljZmEwNzFkZTI4MmY5YWZhZGEiLCJpYXQiOjE1NDExODAxNTEsIm5iZiI6MTU0MTE4MDE1MSwiZXhwIjoxNTcyNzE2MTUxLCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.qGTitB2xSrROQFp_77V9guBFjcmY5FHUMizq4rMoMJxR22rFOQOLH_yi1mXlbSQ5dD5R5mSymrB3TRByvnhu95MJk3TWPRU66susL8yyV3nHA_aOMEpVNon1WinsFP4b7YQDOtgC4fa9yrxDE9KxdSU0WpQ-GxG9XCRJeudXhxYEAnBWwjmWdd7g-nidqsQUmnmjF_opI9TPXG7bbCUQjl5fO5Y7AHmS-qOhanpBL6eKFoRp9-aJtnIFofVAtCnS3hElvAhhNXgVdH0hp__f1O-y34qz_OIYI9EWUV3PpdZy_Rd-tAZW05-XHbzBykYlH13U4n7ViXtbiFmTuXmBP3amXrZB09zA_hGTB1fAYEsqNDQXgGDBc4T4ueeH6wGSaSVt3k1AfZmKCU7nNj8I6hHJ_fkeT795PQ-_UKK8c8P06xRy-YtSJMfvvOS08Vd3VDIAf0BOEreiX1EfSRBfov43KpDFuIvDtuKX50Vssxuv2NxGalGHapJLzKSm4xz9iJtKRcS_qQaGos_Xddu1Fy-w5s1FPkz0GTiY1HLxSag-44PfmKgRNQbgm7O6now6R2duVbqWkv05VngR3QnFG4pjDKH4kxRFFTUEXcmyGHrKpcodohK1QdpIz80N-vESf11tqFb5xcWKgqKPNN0Zsru1OuN05_e2tQ5GGuA3mJU',
            },
            body: JSON.stringify({
              
            })
        }).then((response) => response.json())
          .then((responseJson) => {
              
              var itemsToSet = responseJson.data; 
              console.log("resp:",responseJson);
              this.setState({items:itemsToSet,loading:false});
        }).catch((error) => {
            alert("updated slow network");
            console.log("on error featching:"+error);
            this.setState({loading:false});
        });
      }
    });
    console.log(connectionInfoLocal);
    
  }
  _remove_list_item = (item) =>{
      var arr = this.state.BillList;
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
      this.setState({AddListSendBillVisible:false,BillList:[]});
      setTimeout(()=>{this.setState({BillList:arr});},0);
      // var arrC = arr;
      // this.setState({AddListSendBillVisible:false,BillList:arrC});
      
      console.log("this is final",this.state.BillList,arr);
  }
  _MakeViewArray = (input) =>{
      var arrToPush = [];
      for(var item in input){
        if(item != 'avtar_url')
            console.log(arrToPush.push({title:item,value:input[item]}));
      }
      this.setState({ViewArray:arrToPush});
  }
  render(){
    
    var {items} = this.state;
    
    // BillList=[];
    if(this.state.loading){
      return (
          <View style={styles.loder}>
          <Spinner  color='blue'/>
          </View>
      );
    }else{
      return(
        <Container>
            <List dataArray={items}
              renderRow={(item) =>
                  <ListItem avatar style={{borderBottomWidth:1,borderBottomColor:'#c9c9c9'}}>
                      <Left>
                        <Thumbnail source={{ uri: item.avtar_url }} />
                      </Left>
                      <Body>
                          <Text>{item.clint_name}</Text>
                          <Text note>Work Type: {item.work_type}</Text>
                          <Text note style={{color:'#3679e5'}}>{item.date}</Text>
                          <View style={{flexDirection:'row'}}>
                            <TouchableOpacity 
                                style={{alignSelf:'center',margin:4,paddingHorizontal:15,paddingVertical:4,borderColor:'black',borderWidth:1,borderRadius:15,alignContent:'center'}}
                                onPress={()=>{
                                    this.setState({
                                        sendBillTo_ID:item.req_id,
                                        SendBillVisible:true,
                                        // BillList:[],
                                        addListTitle:'',
                                        addListCost:'',
                                    });
                                }}
                            >
                              <Text>Send Bill</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{alignSelf:'center',margin:4,paddingHorizontal:15,paddingVertical:4,borderColor:'black',borderWidth:1,borderRadius:15,alignSelf:'center'}}
                                onPress={()=>{this._MakeViewArray(item); this.setState({ViewRequet:true,}) }}
                            >
                              <Text>View</Text>
                            </TouchableOpacity>
                          </View>
                          
                      </Body>
                      <Right style={{alignContent:'center',alignSelf:'center',}}>
  
                            <Button  transparent onPress={()=>{this._handleCall(item.contactNo)}}>
                                <Icon name="phone" style={{fontSize:30,color:"#17b003"}}/>
                            </Button>
  
                      </Right>
                  </ListItem>
              }>
            </List>
            {/* SendBill Model */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.SendBillVisible}
                onRequestClose={() => {
                    this.setState({
                        SendBillVisible:false
                    })
                }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',backgroundColor:'#111111d6'}}>
                    <View style={{ width: width*(0.95), height: 500,backgroundColor:"#ffffff"}}>
                        <TouchableOpacity onPress={()=>{this.setState({SendBillVisible:false})}}>
                            <Icon name="x-square" style={{alignSelf:'flex-end',fontSize:30}}/>
                        </TouchableOpacity>
                        <Text style={{fontSize:30,alignSelf:'center'}}>Send Bill</Text>
                        <Divider style={{ backgroundColor: '#ff5722' }} />
                        <View style={{flexDirection:'row',padding:4,paddingHorizontal:10,}}>
                            <Text style={{margin:10,flex:1,fontSize:24}}>Bill List</Text>
                            <Button rounded warning transparent 
                                style={{flex:1,borderBottomColor:'red',borderWidth:1}}
                                onPress={()=>{
                                  this.setState({AddListSendBillVisible:true,addListTitle:'',addListCost:''})
                                }}
                            ><Text>Add List</Text></Button>
                        </View>
                        <ScrollView>
                          <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                              <List dataArray={this.state.BillList}
                                renderRow={(item) =>
                                  <ListItem style={{flexDirection:'row'}}>
                                    <Text style={{flex:5}}>{item.work}</Text>
                                    <Text style={{flex:5,alignSelf:'center'}}>{item.price}</Text>
                                    <TouchableOpacity onPress={()=>{
                                        this._remove_list_item(item.list_id);
                                        this.setState({AddListSendBillVisible:true,addListTitle:item.work,addListCost:item.price});
                                    }}><Icon style={{flex:2,fontSize:25}} name='edit'/></TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{
                                        this._remove_list_item(item.list_id);
                                    }}><Icon style={{flex:2,fontSize:25}} name='x'/></TouchableOpacity>
                                  </ListItem>
                                }>
                              </List>
                          </View>
                        </ScrollView>
                        <Divider style={{ backgroundColor: '#ff5722' }} />
                        <View style={{alignContent:'flex-end',flexDirection:'row',alignItems:'flex-end',alignSelf:'flex-end'}}>
                            <Button transparent onPress={()=>{this.setState({SendBillVisible:false})}}><Text>Cancle</Text></Button>
                            <Button transparent onPress={()=>{
                                this.setState({SendBillVisible:false});
                                console.log(this.state.BillList);
                            
                            }}><Text>Send</Text></Button>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* SendBill modal end */}
            {/* add list send bill Model */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.AddListSendBillVisible}
                onRequestClose={() => {
                    this.setState({
                        AddListSendBillVisible:false
                    })
                }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',backgroundColor:'#111111d6'}}>
                    <View style={{ width: width*(0.95), height: 300,backgroundColor:"#ffffff"}}>
                        <TouchableOpacity onPress={()=>{this.setState({AddListSendBillVisible:false})}}>
                            <Icon name="x-square" style={{alignSelf:'flex-end',fontSize:30}}/>
                        </TouchableOpacity>
                        <Text style={{fontSize:30,alignSelf:'center'}}>Add List</Text>
                  
                        <ScrollView>
                          <View style={{ width: width*(0.95), alignSelf:'center',marginVertical:5}}>
                            <Form>
                              <Item inlineLabel>
                                <Label style={{color:'#ff5722'}}>Title</Label>
                                <Input 
                                    style={{marginRight:30}} 
                                    underlineColorAndroid="black"
                                    onChangeText={(text)=>{this.setState({addListTitle:text})}}
                                    value={this.state.addListTitle}
                                />
                              </Item>
                              <Item inlineLabel last>
                                <Label style={{color:'#ff5722'}}>Cost</Label>
                                <Input
                                    style={{marginRight:30}} 
                                    underlineColorAndroid='black'
                                    onChangeText={(text)=>{this.setState({addListCost:text})}}
                                    keyboardType='numeric'
                                    value={this.state.addListCost}
                                />
                              </Item>
                            </Form>
                          </View>
                        </ScrollView>
                        <View style={{alignContent:'flex-end',flexDirection:'row',alignItems:'flex-end',alignSelf:'flex-end'}}>
                            <Button transparent onPress={()=>{this.setState({AddListSendBillVisible:false})}}><Text>Cancle</Text></Button>
                            <Button transparent onPress={()=>{

                                var temparr = this.state.BillList;
                                temparr.push({work:this.state.addListTitle,price:this.state.addListCost,list_id:temparr.length+1});
                                this.setState({AddListSendBillVisible:false,BillList:temparr})
                            }}><Text>Add</Text></Button>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* 
            * we can impove add send bill for particular use using 2-d array 
            */}
            {/* add list SendBill modal end */}
            {/* View Model */}
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.ViewRequet}
                onRequestClose={() => {
                    this.setState({
                        ViewRequet:false
                    })
                }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',backgroundColor:'#111111d6'}}>
                    <View style={{ width: width*(0.95), height: height*(0.90),backgroundColor:"#ffffff"}}>
                        <TouchableOpacity onPress={()=>{this.setState({ViewRequet:false})}}>
                            <Icon name="x-square" style={{alignSelf:'flex-end',fontSize:30}}/>
                        </TouchableOpacity>
                        <Text style={{fontSize:30,alignSelf:'center'}}>View Request</Text>
                        <Divider style={{ backgroundColor: '#ff5722' }} />
                        <ScrollView>
                          <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                              <List dataArray={this.state.ViewArray}
                                renderRow={(item) =>
                                  <ListItem style={{flexDirection:'row'}}>
                                    <Text style={{flex:5,fontWeight:'800',alignItems:'flex-end'}}>{item.title} :</Text>
                                    <Text style={{flex:6,alignSelf:'center'}}>{item.value}</Text>
                                  </ListItem>
                                }>
                              </List>
                          </View>
                        </ScrollView>
                        <Divider style={{ backgroundColor: '#ff5722' }} />
                        <View style={{alignContent:'flex-end',flexDirection:'row',alignItems:'flex-end',alignSelf:'flex-end'}}>
                            <Button transparent onPress={()=>{this.setState({ViewRequet:false})}}><Text>Back</Text></Button>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* View modal end */}
      </Container>
      );
    }
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeImage: {
    width: width,
    height: 300,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  codeHighlightText: {//
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {//
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {//
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {//
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
