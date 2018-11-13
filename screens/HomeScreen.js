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
  ScrollView
} from "react-native";
import { Container, Spinner,List,ListItem, Text,Content,Left,Right,Body,Thumbnail,Button,Item,Input,Form,Label} from 'native-base';
import Icon  from 'react-native-vector-icons/Feather';    
import {Divider  } from 'react-native-elements';
import Global from '../constants/Global';
const {width} = Dimensions.get('window');
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
      if(connectionInfo.type == 'none'){
        console.log("no internet ");
        
        ToastAndroid.showWithGravityAndOffset(
          'Oops! No Internet Connection',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        this.setState({loading:false});
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
  render(){
    
    var {items} = this.state;
    var BillList = [
       {work:'Simon Mignolet',price:'100',},
       {work:'Nathaniel Clyne',price:'100',},
       {work:'Dejan Lovren',price:'100',},
       {work:'Mama Sakho',price:'100',},
       {work:'Emre Can',price:'100',},
       {work:'Simon Mignolet',price:'100',},
       {work:'Nathaniel Clyne',price:'100',},
       {work:'Dejan Lovren',price:'100',},
       {work:'Mama Sakho',price:'100',},
       {work:'Emre Can',price:'100',},
    ];
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
                          <Text>{item.title}</Text>
                          <Text note>Work Type: {item.work_type}</Text>
                          <Text note style={{color:'#3679e5'}}>{item.date}</Text>
                          <View style={{flexDirection:'row'}}>
                            <TouchableOpacity 
                                style={{alignSelf:'center',margin:4,paddingHorizontal:15,paddingVertical:4,borderColor:'black',borderWidth:1,borderRadius:15,alignContent:'center'}}
                                onPress={()=>{this.setState({SendBillVisible:true,}) }}
                            >
                              <Text>Send Bill</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{alignSelf:'center',margin:4,paddingHorizontal:15,paddingVertical:4,borderColor:'black',borderWidth:1,borderRadius:15,alignSelf:'center'}}
                                onPress={()=>{this.setState({ViewRequet:true,}) }}
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
                                  this.setState({AddListSendBillVisible:true})
                                }}
                            ><Text>Add List</Text></Button>
                        </View>
                        <ScrollView>
                          <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                              <List dataArray={BillList}
                                renderRow={(item) =>
                                  <ListItem style={{flexDirection:'row'}}>
                                    <Text style={{flex:5}}>{item.work}</Text>
                                    <Text style={{flex:5,alignSelf:'center'}}>{item.price}</Text>
                                    <TouchableOpacity><Icon style={{flex:2,fontSize:25}} name='edit'/></TouchableOpacity>
                                    <TouchableOpacity><Icon style={{flex:2,fontSize:25}} name='x'/></TouchableOpacity>
                                  </ListItem>
                                }>
                              </List>
                          </View>
                        </ScrollView>
                        <Divider style={{ backgroundColor: '#ff5722' }} />
                        <View style={{alignContent:'flex-end',flexDirection:'row',alignItems:'flex-end',alignSelf:'flex-end'}}>
                            <Button transparent onPress={()=>{this.setState({SendBillVisible:false})}}><Text>Cancle</Text></Button>
                            <Button transparent onPress={()=>{this.setState({SendBillVisible:false})}}><Text>Send</Text></Button>
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
                                    underlineColorAndroid="black"
                                />
                              </Item>
                              <Item inlineLabel last>
                                <Label style={{color:'#ff5722'}}>Cost</Label>
                                <Input
                                    style={{marginRight:30}} 
                                    underlineColorAndroid='black'
                                />
                              </Item>
                            </Form>
                          </View>
                        </ScrollView>
                        <View style={{alignContent:'flex-end',flexDirection:'row',alignItems:'flex-end',alignSelf:'flex-end'}}>
                            <Button transparent onPress={()=>{this.setState({AddListSendBillVisible:false})}}><Text>Cancle</Text></Button>
                            <Button transparent onPress={()=>{this.setState({AddListSendBillVisible:false})}}><Text>Send</Text></Button>
                        </View>
                    </View>
                </View>
            </Modal>
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
                    <View style={{ width: width*(0.95), height: 500,backgroundColor:"#ffffff"}}>
                        <TouchableOpacity onPress={()=>{this.setState({ViewRequet:false})}}>
                            <Icon name="x-square" style={{alignSelf:'flex-end',fontSize:30}}/>
                        </TouchableOpacity>
                        <Text style={{fontSize:30,alignSelf:'center'}}>View Request</Text>
                        <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                            <View style={{flexDirection:'row'}}>
                                <Input/>
                            </View>
                                           
                            <Button success style={{marginVertical:4,alignContent:'flex-end'}} 
                                onPress={this.submitRegister}
                                disabled={this.state.reg_submitButtonDisable}
                            >
                                <Text>Sign Up</Text>
                            </Button>
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
