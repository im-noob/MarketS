import React from 'react';
import {
  StyleSheet,
  Linking ,
  Dimensions,
  Platform,
  NetInfo,
  View
} from "react-native";
import { Container, Spinner,List,ListItem, Text,Content,Left,Right,Body,Thumbnail,Button} from 'native-base';
import Icon  from 'react-native-vector-icons/Feather';    
import {  } from 'react-native-elements'

const {width} = Dimensions.get('window');
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Incoming Request",
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
        var itemsToSet =  [
          {title:'Donald Trump',work_type:'Car Reparing',date:'28 Nov 2018 11:24 AM',contact:"",avtar_url:'https://instagram.fpat1-1.fna.fbcdn.net/vp/6d5170dcf49f011a0c016d4b572543d8/5C662705/t51.2885-19/s150x150/23823676_515039535523575_7479748231031685120_n.jpg'},
          {title:'Akshay Kumar',work_type:'Laptop Reparing',date:'25 Nov 2018 2:38 PM',contact:"",avtar_url:'https://instagram.fpat1-1.fna.fbcdn.net/vp/ee936c0c7ea5ed553dc0be21928327b6/5C7C4289/t51.2885-19/s150x150/17265645_1686057661694242_1994307655182581760_a.jpg'},
        ];
        this.setState({items:itemsToSet,loading:false});
      }else{
        console.log("yes internet ");
        fetch('http://gomarket.ourgts.com/public/api/incoming_request', {
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
        });
      }
    });
    console.log(connectionInfoLocal);
    
  }
  render(){
    
    var {items} = this.state;
    if(this.state.loading){
      return (
          <View style={styles.loder}>
          <Spinner  color='blue'/>
          </View>
      );
    }else{
      return(
        <List dataArray={items}
              renderRow={(item) =>
                  <ListItem avatar>
                      <Left>
                        <Thumbnail source={{ uri: item.avtar_url }} />
                      </Left>
                      <Body>
                          <Text>{item.title}</Text>
                          <Text note>Work Type: {item.work_type}</Text>
                          <Text note style={{color:'#3679e5'}}>{item.date}</Text>
  
                      </Body>
                      <Right>
  
                            <Button  transparent onPress={()=>{this._handleCall("8340669783")}}>
                                <Icon name="phone" style={{fontSize:30,color:"#17b003"}}/>
                            </Button>
  
                      </Right>
                  </ListItem>
              }>
          </List>
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
