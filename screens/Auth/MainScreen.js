import React, { Component } from "react";
import {
    StyleSheet,
    ImageBackground ,
    View,
    Dimensions,
    Image,
    Modal,
    TouchableOpacity,
    Linking,
    NetInfo
} from "react-native";
import { Container, Spinner, Button,Text, Item,Input,CheckBox,Body} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { } from 'react-native-elements'

import Global from '../../constants/Global';
const {height,width} = Dimensions.get('window');
export default class MainScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            loginModelVisible:false,
            signUpModelVisible:false,
            submitButtonDisable:false,
            email_or_phone:"",
            password:"",

            reg_name:'',
            reg_email:'',
            reg_phone:'',
            reg_password:'',
            reg_confirm:'',
            reg_submitButtonDisable:true,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }
    _openLoginModel = () =>{
        this.setState({
            loginModelVisible:true,
            signUpModelVisible:false,
        })
    }
    _openSignUpModel = () =>{
        this.setState({
            loginModelVisible:false,
            signUpModelVisible:true,
        })
    }


    // handle login 
    _retrieveData = async () => {
        try {
          //await AsyncStorage.setItem('key_login_status_market_g', 'false');

            const value = await AsyncStorage.getItem('key_login_status_market_g');
            if (value !== null) {
                if(value == 'true'){
                    this.setState({
                        login_status: true
                    });
                }
                
            }
        } catch (error) {
            this.setState({
                login_status: false
            });
         }
      }
    _storeData = async (user_email,user_phone,user_name,user_state,user_city,user_landmark,user_address) => {
        try {
          await AsyncStorage.setItem('key_login_status_market_g', 'true');
          await AsyncStorage.setItem('user_email',user_email );
          await AsyncStorage.setItem('user_phone',user_phone );
          await AsyncStorage.setItem('user_name',user_name );
          await AsyncStorage.setItem('user_state',user_state);
          await AsyncStorage.setItem('user_city',user_city );
          await AsyncStorage.setItem('user_landmark',user_landmark );
          await AsyncStorage.setItem('user_address',user_address );


          let email = await AsyncStorage.getItem('user_email');
          let phone = await AsyncStorage.getItem('user_phone');
          let name = await AsyncStorage.getItem('user_name');
          let state = await AsyncStorage.getItem('user_state');
          let city = await AsyncStorage.getItem('user_city');
          let landmark = await AsyncStorage.getItem('user_landmark');
          let address = await AsyncStorage.getItem('user_address');
          console.log("in llogin retriving data ",email,phone,name,state,city,landmark,address);
            console.log("saved in login");
        }catch (error) {
            console.log("Eroor in saving");
        }
    }
    submitLogin = () =>{


        if(this.state.email_or_phone.trim().length == 0 || this.state.password.length == 0 ){
            alert("Enter Email and Password first")
            return;
        }
        


        // now sending request to login
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
            this.setState({submitButtonDisable:true});
            var username = this.state.email_or_phone.toLowerCase();
            var password = this.state.password;
            console.log(username+":"+password);
            fetch(Global.API_URL+'login', {
                method: 'POST',
                headers: {
                    
                },
                body: JSON.stringify({
                    email:username,
                    password:password,
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                
                var itemsToSet = responseJson.success.token; 
                if(itemsToSet.length != 0 ){
                    
                }
                console.log("resp:",itemsToSet);
                this.setState({submitButtonDisable:false});
                }).catch((error) => {
                    alert("slow network");
                    console.log("on error featching:"+error);
                    this.setState({submitButtonDisable:false});
            });
        }
        });
        console.log(connectionInfoLocal);
    }
    saveNotificationToken = () => {
        console.log("noti");
    }
    
    forgetPasswrod =() =>{
        this.props.navigation.navigate('ForgetPass');
    }

    // handle regiter 
    submitRegister = () =>{
        if(
            this.state.reg_name.trim().length == 0 || 
            this.state.reg_email.trim().length == 0 || 
            this.state.reg_password.trim().length == 0 || 
            this.state.reg_confirm.trim().length == 0 || 
            this.state.reg_phone.trim().length == 0  
        ){
            alert("All Fields are required")
            return;
        }
        


        // now sending request to login
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
            this.setState({reg_submitButtonDisable:true});
            var name = this.state.reg_name;
            var email = this.state.reg_email.toLowerCase();
            var password = this.state.reg_password;
            var c_password = this.state.reg_confirm;
            var phone = this.state.reg_phone;
            console.log(name,":",email,":",password,":",c_password,":",phone);
            fetch(Global.API_URL+'register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    'name':name,
                    'email':email,
                    'password':password,
                    'c_password':c_password,
                    'phone':phone,
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                
                var itemsToSet = responseJson.data; 
                console.log("resp:",responseJson);
                this.setState({reg_submitButtonDisable:false});
                }).catch((error) => {
                    alert("slow network");
                    console.log("on error featching:"+error);
                    this.setState({reg_submitButtonDisable:false});
            });
        }
        });
        console.log(connectionInfoLocal);
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
                                <Button rounded bordered info style={{alignSelf:'center',margin:5,paddingHorizontal:20}} onPress={()=>{this._openLoginModel()}}>
                                    <Text>Login</Text>
                                </Button>
                                <Button rounded bordered light style={{alignSelf:'center',margin:5,paddingHorizontal:15}} onPress={()=>{this._openSignUpModel()}}>
                                    <Text>Sign Up</Text>
                                </Button>
                            </View>
                            
                            {/* loginModel */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.loginModelVisible}
                                onRequestClose={() => {
                                    this.setState({
                                        loginModelVisible:false
                                    })
                                }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',borderRadius:0.2,borderColor:'#fff'}}>
                                    <View style={{ width: width*(0.95), height: 300,backgroundColor:"#ffffff",borderRadius:0.2,borderColor:'#fff'}}>
                                        <TouchableOpacity onPress={()=>{this.setState({loginModelVisible:false})}}>
                                            <Icon name="close-circle-outline" style={{alignSelf:'flex-end',fontSize:30}}/>
                                        </TouchableOpacity>
                                        <Text style={{fontSize:30,alignSelf:'center'}}>Sign In</Text>
                                        <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                                            <Item regular style={{marginVertical:2}}>
                                                <Input 
                                                    placeholder='Email' 
                                                    onChangeText={(text) => this.setState({email_or_phone:text})}
                                                    textContentType='username'
                                                />
                                            </Item>
                                            <Item regular style={{marginVertical:2}}>
                                                <Input 
                                                    placeholder='Password'
                                                    onChangeText={(text) => this.setState({password:text})} 
                                                    secureTextEntry={true}
                                                    textContentType='password'
                                                 />
                                            </Item>
                                            <TouchableOpacity style={{marginVertical:5}} onPress={this.forgetPasswrod}>
                                                <Text style={{alignSelf:'flex-end'}}>Forgot Password?</Text>
                                            </TouchableOpacity>                  
                                            <Button rounded success block 
                                                onPress={this.submitLogin}
                                                disabled = {this.state.submitButtonDisable}
                                            >
                                                <Text>Login</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            {/* Login modal end */}

                            {/* Sign UP Model */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.signUpModelVisible}
                                onRequestClose={() => {
                                    this.setState({
                                        signUpModelVisible:false
                                    })
                                }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{ width: width*(0.95), height: 500,backgroundColor:"#ffffff"}}>
                                        <TouchableOpacity onPress={()=>{this.setState({signUpModelVisible:false})}}>
                                            <Icon name="close-circle-outline" style={{alignSelf:'flex-end',fontSize:30}}/>
                                        </TouchableOpacity>
                                        <Text style={{fontSize:30,alignSelf:'center'}}>Sign Up</Text>
                                        <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                                            <Item regular style={{marginVertical:2}}>
                                                <Input 
                                                    placeholder='Full Name' 
                                                    onChangeText={(text) => this.setState({reg_name:text})}
                                                    textContentType='name'
                                                    returnKeyType='next'
                                                    onSubmitEditing={()=>{}}
                                                />
                                            </Item>
                                            <Item regular style={{marginVertical:2}}>
                                                <Input 
                                                    placeholder='Email' 
                                                    onChangeText={(text) => this.setState({reg_email:text})}
                                                    textContentType='emailAddress'
                                                    returnKeyType='next'
                                                    onSubmitEditing={()=>{}}
                                                    keyboardType='email-address'

                                                />
                                            </Item>
                                            <Item regular style={{marginVertical:2}}>
                                                <Input 
                                                    placeholder='Phone NO'
                                                    onChangeText={(text) => this.setState({reg_phone:text})}
                                                    textContentType='telephoneNumber'
                                                    returnKeyType='next'
                                                    onSubmitEditing={()=>{}}
                                                    keyboardType='numeric'

                                                />
                                            </Item>
                                            <Item regular style={{marginVertical:2}}>
                                                <Input 
                                                    placeholder='Password'
                                                    onChangeText={(text) => this.setState({reg_password:text})}
                                                    textContentType='password' 
                                                    returnKeyType='next'
                                                    onSubmitEditing={()=>{}}
                                                    secureTextEntry={true}
                                                    keyboardType='visible-password'
                                                />
                                            </Item>    
                                            <Item regular style={{marginVertical:2}}>
                                                <Input 
                                                    placeholder='Confirm password'
                                                    onChangeText={(text) => this.setState({reg_confirm:text})}
                                                    textContentType='password' 
                                                    returnKeyType='go'
                                                    onSubmitEditing={this.submitRegister}
                                                    secureTextEntry={true}
                                                    keyboardType='visible-password'
                                                />
                                            </Item>                 
                                            <Button rounded success block style={{marginVertical:4}} 
                                                onPress={this.submitRegister}
                                                disabled={this.state.reg_submitButtonDisable}
                                            >
                                                <Text>Sign Up</Text>
                                            </Button>
                                            <View style={{marginVertical:6}}>
                                                <Text style={{fontSize:14,alignSelf:'center',color:'#6f6f6f'}}>Clicking Sign Up means that you are agree to the</Text>
                                                <View style={{flexDirection:'row',alignSelf:'center'}}>
                                                    <TouchableOpacity onPress={()=>{Linking.openURL("https://google.com")}}><Text style={{fontSize:14,color:'#2da2d6'}}>Terms & Conditions</Text></TouchableOpacity>
                                                    <Text style={{fontSize:14,color:'#6f6f6f'}}> and </Text>
                                                    <TouchableOpacity onPress={()=>{Linking.openURL("https://google.com")}}><Text style={{fontSize:14,color:'#2da2d6'}}>Privacy Policy.</Text></TouchableOpacity>                                            
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            {/* signUpModel modal end */}
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