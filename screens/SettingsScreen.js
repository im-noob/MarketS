import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MapView from 'react-native-maps';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Content, List, Left, Body, Right, ListItem, Button,Card,CardItem } from 'native-base'
import { createStackNavigator } from 'react-navigation';
import EditProfile from './EditProfile';
import EditWork from './EditWork';

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
        latitude: 25.240905,
        longitude: 86.992738,

    }
}

/* form changing status of active ttab */
segmentClicked(index) {
  this.setState({
      activeIndex: index
  })
}
/* render middle section*/
renderSection() {
  var items0 = [
    {A:'Wire Man',B:'300-600'},
    {A:'Warring',B:'1000-1200'},
    {A:'Fan Repair',B:'250-550'},
    {A:'Tv Repair',B:'1800-6000'},
    {A:'Washing Machine Repair',B:'2600-6600'},

  ];
  var items1 = [
    {A:'Work Experience',B:'3 Year'},
    {A:'Working Hour',B:'10:00-4:00'},
  ];
  var items2 = [
    {A:'State',B:'Bihar'},
    {A:'City',B:'BGP'},
    {A:'PinCode',B:'812001'},
    {A:'Address',B:'Nayabazar,Near Hanuman Mandir, House no:31'},
  ];
  
  if (this.state.activeIndex == 0) {
    return (
      <Container>
        <Content>
          <ListItem icon>
            <Left>
              <Text>Work</Text>
            </Left>
            <Body/>
            <Right>
              <Text>Min-Max Rate</Text>
            </Right>
          </ListItem>
          
          <List dataArray={items0}
            renderRow={(item) =>
              <ListItem>
                <Body>
                  <Text><Icon active name="check-all" size={20} color='#1390c3'/>   {item.A}</Text>
                </Body>
                <Right>
                  <Text>{item.B}</Text>
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
                <Body>
                  <Text><Icon active name="check-all" size={20} color='#1390c3'/>   {item.A}</Text>
                </Body>
                <Right>
                  <Text>{item.B}</Text>
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
                <Body>
                  <Text><Icon active name="check-all" size={20} color='#1390c3'/>   {item.A}</Text>
                </Body>
                <Right>
                  <Text>{item.B}</Text>
                </Right>
              </ListItem>
            }>
          </List>

        </Content>
      </Container>
    )
  }
  else if (this.state.activeIndex == 3) {
    return (
      <View style={{ height: 300 }}>
        
          <MapView style={styles.map} initialRegion={{
                    latitude:this.state.latitude ,
                    longitude:this.state.longitude,
                    latitudeDelta: .05,
                    longitudeDelta: .05
                    }}> 
                
                    {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                        coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                        title={"Your Location"}
                    />}

                </MapView>    
      </View>
    )
  }
}
  render() {
    return(
      
        <Container style={styles.container}>
          <Content>
                <View style={{ paddingTop: 10 }}>
                    {/** User Photo Stats**/}
                    <View style={{ flexDirection: 'row' }}>
                        {/**User photo takes 1/3rd of view horizontally **/}
                        <View
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image source={require('../assets/images/me.png')}
                                style={{ width: 75, height: 75, borderRadius: 37.5 }} />
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
                                    <Text>485<Icon name="account-search" style={{ color: 'black' }}></Icon></Text>
                                    <Text style={{ fontSize: 10, color: 'grey' }}>Searched</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>205<Icon name="checkbox-marked-circle" style={{ color: '#63af04' }}></Icon></Text>
                                    <Text style={{ fontSize: 10, color: 'grey' }}>Contract</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>4.9<Icon name="star" style={{ color: 'black' }}></Icon></Text>
                                    <Text style={{ fontSize: 10, color: 'grey' }}>Ratting</Text>
                                </View>
                            </View>

                            {/**Edit profile and Settings Buttons **/}
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                                <View
                                    style={{ flexDirection: 'row' }}>
                                    {/** Edit profile takes up 3/4th **/}
                                    <Button bordered dark
                                        style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }} onPress={()=>{this.props.navigation.navigate('EditProfile')}}><Text>Edit Profile</Text></Button>
                                    {/** Settings takes up  1/4th place **/}
                                    <Button bordered dark style={{
                                        flex: 1,
                                        height: 30,
                                        marginRight: 10, marginLeft: 5,
                                        justifyContent: 'center'
                                    }} 
                                    onPress={()=>{this.props.navigation.navigate('EditWork')}}>
                                        <Icon name="settings" style={{ color: 'black' }}></Icon></Button>
                                </View>
                            </View>{/**End edit profile**/}
                        </View>
                    </View>

                    <View style={{ paddingBottom: 10 }}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Aarav Kumar</Text>
                            <Text>Wire Man | Software Engg.</Text>
                            <Text>+91 8340669783</Text>
                        </View>
                    </View>
                </View>

                <View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1,borderBottomWidth:1, borderBottomColor : '#eae5e5' , borderTopColor: '#eae5e5' }}>
                        <Button
                            onPress={() => this.segmentClicked(0)}
                            transparent
                            active={this.state.activeIndex == 0}
                        >
                            <Icon name="lightbulb-on-outline" style={[{ fontSize: 32 }, this.state.activeIndex == 0 ? {} : { color: 'grey' }]} >
                            </Icon>
                        </Button>
                        <Button
                            onPress={() => this.segmentClicked(1)}
                            transparent active={this.state.activeIndex == 1}>
                            <Icon name="worker" style={[{ fontSize: 32 }, this.state.activeIndex == 1 ? {} : { color: 'grey' }]}></Icon>
                        </Button>
                        <Button
                            onPress={() => this.segmentClicked(2)}
                            transparent active={this.state.activeIndex == 2}>
                            <Icon name="map" style={[{ fontSize: 32 },this.state.activeIndex == 2 ? {} : { color: 'grey' }]}></Icon>
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
        </Container >
            
      
    );
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