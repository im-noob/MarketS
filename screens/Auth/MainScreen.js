import React, { Component } from "react";
import {
    StyleSheet,
    ImageBackground ,
    View,
    Dimensions,
    Image
} from "react-native";
import { Container, Spinner, Button,Text, Content} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { } from 'react-native-elements'

import Global from '../../constants/Global';
const {height} = Dimensions.get('window');
export default class MainScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                        <ImageBackground source={{ uri: "https://i.imgur.com/STZpybm.jpg", cache: 'force-cache', }} style={{width: '100%', height: '100%'}}>
                            <Text> </Text>
                            <View style={{alignSelf:'center',top:height*(0.01)}}>
                                <Image source={ require('../../assets/images/market.png') } />
                            </View>
                            <View style={{alignSelf:'center',top:height*(0.01)}}>
                                <Text style={{color:"#fff", fontSize:30,fontWeight:'800',alignSelf:'center'}}>Let's Connect With US</Text>
                                <Text style={{color:"#fff", fontSize:30,fontWeight:'800',alignSelf:'center'}}>Get your job on call</Text>
                            </View>
                            <View style={{alignSelf:'center',top:height*(0.03)}}>
                                <Text style={{color:"#fff", fontWeight:'800',alignSelf:'center'}}>Register with us by filling some basic</Text>
                                <Text style={{color:"#fff", fontWeight:'800',alignSelf:'center'}}>Details and get your work request inapp</Text>
                                <Text style={{color:"#fff", fontWeight:'800',alignSelf:'center'}}>Do the exiting work with this app </Text>
                                <Text style={{color:"#fff", fontWeight:'800',alignSelf:'center'}}>and earn free money</Text>
                            </View>
                            <View style={{alignSelf:'center',top:height*(0.07)}}>
                                <Button rounded bordered info style={{alignSelf:'center',margin:5}}>
                                    <Text>Login</Text>
                                </Button>
                                <Button rounded bordered light style={{alignSelf:'center',margin:5}}>
                                    <Text>Sign Up</Text>
                                </Button>
                            </View>
                            
                        </ImageBackground>
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
    loder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});