import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  NetInfo,
  ToastAndroid,
  AsyncStorage

} from 'react-native';
import MapView from 'react-native-maps';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Content, List, Left, Body, Right, ListItem, Button,Card,CardItem,Thumbnail,Spinner,Text, } from 'native-base'
import { createStackNavigator } from 'react-navigation';
import EditProfile from './EditProfile';
import EditWork from './EditWork';
import Global from '../constants/Global';

const {height,width} = Dimensions.get('window');
class SettingsScreen extends React.Component {
static navigationOptions = {
    header: (<Image source={require('../assets/images/cover.png')}
    style={{ width: width, height: 75 }} />),
  };
  
  constructor(props) {
    super(props)

    this.state = {
        activeIndex: 0,
        // latitude: 25.240905,
        // longitude: 86.992738,
        displayName:"",
        contactNO:"",

        mainwork:"",
        avtar_url:"../assets/images/icon.png",
        searched:"",
        contract:"",
        ratting:"",
        items0:[],
        items1:[],
        items2:[],
        loading:false,
        renderComponentFlag:false,
      }
  }
  /*      ++name:"aarav kumar",
          ++phoneno:"8340669783",

          -->state:"Bihar",
          -->city:"Bhagalpur",
          -->pincode:"812002",
          -->address:"Nayabazar,Near Hanuman Mandir, House no:31",

          =>workingHour="10:00:AM-04:00:PM";
          workType:"",
          =>expYear:"5",
  */
  /* form changing status of active ttab */
  segmentClicked(index) {
    this.setState({
        activeIndex: index
    })
  }
  componentDidMount(){
    this.featchPorfileDataAfterLoginFromAsync();
    setTimeout(() => {this.setState({renderComponentFlag: true})}, 0);
  }
  _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('AuthS');
    };
  featchPorfileDataAfterLoginFromAsync = async () =>{
    //featching data form asysc storage
    var itemsToSet = JSON.parse(await AsyncStorage.getItem('userProfileData'));
    console.log("tiem to set");
    console.log(itemsToSet);
    this.setState({
        displayName:itemsToSet.displayName,
        contactNO:itemsToSet.contactNO,

        mainwork:itemsToSet.mainwork,
        avtar_url:itemsToSet.avtar_url,
        searched:itemsToSet.searched,
        contract:itemsToSet.contract,
        ratting:itemsToSet.ratting,
        items0:itemsToSet.items0,
        items1:itemsToSet.items1,
        items2:itemsToSet.items2,
        loading:false,
    });    
  }
  /* render middle section*/
  renderSection() {
    var {items0, items1, items2} = this.state;
    
    if (this.state.activeIndex == 0) {
      return (
        <Container>
          <Content>
            <ListItem icon>
              <Left>
                <Text style={{fontSize:16,fontWeight:'800'}}>Work</Text>
              </Left>
              <Body/>
              <Right>
                <Text style={{fontSize:16,fontWeight:'800'}}>Min-Max Rate</Text>
              </Right>
            </ListItem>
            
            <List dataArray={items0}
              renderRow={(item) =>
                <ListItem>
                  <Left>
                    <Text style={{fontSize:14}}><Icon active name="check-all" size={18} color='#1390c3'/> {item.work_name}</Text>
                  </Left>
                  <Right>
                    <Text style={{fontSize:14}}>{item.price}</Text>
                  </Right>
                </ListItem>
              }>
            </List>

          </Content>
        </Container>
      )
    }
    else if (this.state.activeIndex == 1) {
      return (
        <Container>
          <Content>  
            <List dataArray={items1}
              renderRow={(item) =>
                <ListItem>
                  <Left>
                    <Text style={{fontSize:14}}><Icon active name="check-all" size={18} color='#1390c3'/> {item.A}</Text>
                  </Left>
                  <Right>
                    <Text style={{fontSize:14}}>{item.B}</Text>
                  </Right>
                </ListItem>
              }>
            </List>

          </Content>
        </Container>
      )
    }
    else if (this.state.activeIndex == 2) {
      return (
        <Container>
          <Content>  
            <List dataArray={items2}
              renderRow={(item) =>
                <ListItem>
                  <Left>
                    <Text style={{fontSize:14}}><Icon active name="check-all" size={18} color='#1390c3'/> {item.A}</Text>
                  </Left>
                  <Right>
                    <Text style={{fontSize:14}}>{item.B}</Text>
                  </Right>
                </ListItem>
              }>
            </List>

          </Content>
        </Container>
      )
    }
    // else if (this.state.activeIndex == 3) {
    //   return (
    //     <View style={{ height: 300 }}>
          
    //         <MapView style={styles.map} initialRegion={{
    //                   latitude:this.state.latitude ,
    //                   longitude:this.state.longitude,
    //                   latitudeDelta: .05,
    //                   longitudeDelta: .05
    //                   }}> 
                  
    //                   {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
    //                       coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
    //                       title={"Your Location"}
    //                   />}

    //               </MapView>    
    //     </View>
    //   )
    // }
  }
    render() {
      if(this.state.renderComponentFlag && !this.state.loading){
        return(
        
              <Container style={styles.container}>
                <Content>
                      <View style={{ paddingTop: 10 }}>
                          {/** User Photo Stats**/}
                          <View style={{ flexDirection: 'row' }}>
                              {/**User photo takes 1/3rd of view horizontally **/}
                              <View
                                  style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                                  <Image source={{ uri: this.state.avtar_url }}
                                      style={{ width: 75, height: 75, borderRadius: 37.5,borderColor:"black",borderWidth:1 }} />
                              </View>
                              {/**User Stats take 2/3rd of view horizontally **/}
                              <View style={{ flex: 3 }}>
                                  {/** Stats **/}
                                  <View
                                      style={{
                                          flexDirection: 'row',
                                          justifyContent: 'space-around',
                                          alignItems: 'flex-end'
                                      }}>
                                      <View style={{ alignItems: 'center' }}>
                                          <Text>{this.state.searched}<Icon name="account-search" style={{ color: 'black' }}></Icon></Text>
                                          <Text style={{ fontSize: 10, color: 'grey' }}>Searched</Text>
                                      </View>
                                      <View style={{ alignItems: 'center' }}>
                                          <Text>{this.state.contract}<Icon name="checkbox-marked-circle" style={{ color: '#63af04' }}></Icon></Text>
                                          <Text style={{ fontSize: 10, color: 'grey' }}>Contract</Text>
                                      </View>
                                      <View style={{ alignItems: 'center' }}>
                                          <Text>{this.state.ratting}<Icon name="star" style={{ color: 'black' }}></Icon></Text>
                                          <Text style={{ fontSize: 10, color: 'grey' }}>Ratting</Text>
                                      </View>
                                  </View>

                                  {/**Edit profile and Settings Buttons **/}
                                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                                      <View
                                          style={{ flexDirection: 'row' }}>
                                          {/** Edit profile takes up 3/4th **/}
                                          <Button bordered dark
                                              style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }} 
                                              onPress={()=>{
                                                console.log("in edit button press ");
                                                console.log(this.state.items2[1].A);
                                                this.props.navigation.navigate('EditProfile',
                                                  {
                                                  
                                                    name:this.state.displayName,
                                                    phoneno:this.state.contactNO,

                                                    state:this.state.items2[0].B,
                                                    city:this.state.items2[1].B,
                                                    pincode:this.state.items2[2].B,
                                                    address:this.state.items2[3].B,
                                                  }
                                              )}}>
                                                <Text>Edit Profile</Text>
                                              </Button>
                                          {/** Settings takes up  1/4th place **/}
                                          <Button bordered dark style={{
                                              flex: 1,
                                              height: 30,
                                              marginRight: 10, marginLeft: 5,
                                              justifyContent: 'center'
                                          }} 
                                          onPress={()=>{this.props.navigation.navigate('EditWork',{
                                            workingHour:this.state.items1[1].B,
                                            workList:this.state.items0,
                                            expYear:this.state.items1[0].B,
                                          })}}>
                                              <Icon name="settings" style={{ color: 'black' }}></Icon></Button>
                                      </View>
                                  </View>{/**End edit profile**/}
                              </View>
                          </View>

                          <View style={{ paddingBottom: 10 }}>
                              <View style={{ flexDirection:'row',justifyContent:'space-between' }}>
                                  <View style={{paddingHorizontal: 10 }}>
                                      <Text style={{ fontWeight: 'bold',fontSize:25}}>{this.state.displayName}</Text>
                                      <Text>{this.state.mainwork}</Text>
                                      <Text>+91 {this.state.contactNO}</Text>
                                  </View>
                                  <Button danger rounded bordered style={{alignSelf:'center',marginRight: 10, marginLeft: 5,}} onPress={()=>{ this._signOutAsync(); }}>
                                      <Text>Logout </Text>
                                  </Button>
                              </View>
                          </View>
                      </View>

                      <View >
                          <View style={{ backgroundColor:'#f6f6f6', flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1,borderBottomWidth:1, borderBottomColor : '#eae5e5' , borderTopColor: '#eae5e5' }}>
                              <Button
                                  onPress={() => this.segmentClicked(0)}
                                  transparent
                                  active={this.state.activeIndex == 0}
                              >
                                  <Icon name="lightbulb-on-outline" style={[{ fontSize: 32 }, this.state.activeIndex == 0 ? {color:'#2f95dc'} : { color: 'grey' }]} >
                                  </Icon>
                              </Button>
                              <Button
                                  onPress={() => this.segmentClicked(1)}
                                  transparent active={this.state.activeIndex == 1}>
                                  <Icon name="worker" style={[{ fontSize: 32 }, this.state.activeIndex == 1 ? {color:'#2f95dc'} : { color: 'grey' }]}></Icon>
                              </Button>
                              <Button
                                  onPress={() => this.segmentClicked(2)}
                                  transparent active={this.state.activeIndex == 2}>
                                  <Icon name="map" style={[{ fontSize: 32 },this.state.activeIndex == 2 ? {color:'#2f95dc'} : { color: 'grey' }]}></Icon>
                              </Button>
                              {/* <Button
                                  onPress={() => this.segmentClicked(3)}
                                  transparent last active={this.state.activeIndex == 3}>
                                  <Icon name="map-marker-outline" style={[{ fontSize: 32 }, this.state.activeIndex == 3 ? {} : { color: 'grey' }]}></Icon>
                              </Button> */}
                          </View>
                          {/** Height =width/3 so that image sizes vary according to size of the phone yet remain squares **/}

                          {this.renderSection()}
                      </View>
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
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
  },

});


export default class Settings extends React.Component{
  static navigationOptions = {
    header: null,
  };
  render(){
    return(
      <AppStackNavigaor/>
    );
  }
}
const AppStackNavigaor =  createStackNavigator({
  Profile:{
    screen: SettingsScreen,
  },
  EditProfile:{
    screen: EditProfile,
  },
  EditWork:{
    screen:EditWork,
  }

},
{
  header:null,
  // mode: 'modal',
  // headerMode: 'none',
});