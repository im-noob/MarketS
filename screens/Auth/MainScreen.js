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
    NetInfo,
    AsyncStorage,

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
            reg_submitButtonDisable:false,

            reg_name_valid_color:'white',
            reg_email_valid_color:'white',
            reg_phone_valid_color:'white',
            reg_password_valid_color:'white',
            reg_confirm_valid_color:'white',

            reg_name_valid_icon:'check-circle',
            reg_email_valid_icon:'check-circle',
            reg_phone_valid_icon:'check-circle',
            reg_password_valid_icon:'check-circle',
            reg_confirm_valid_icon:'check-circle',

            avilEmail:true,
            avilPhone:true,

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
            fetch(Global.API_URL+'login_S', {
                method: 'POST',
                headers: {
                    
                },
                body: JSON.stringify({
                    email:username,
                    password:password,
                    user_type:'worker',
                    noti_token:Date()+"",
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.error != undefined){
                    if(responseJson.error== "Unauthorised"){
                        this.setState({submitButtonDisable:false});
                        alert("Invalid Email or password");
                        return;
                    }
                    alert("Internal Server error 5004");
                    
                    this.setState({submitButtonDisable:false});
                    return;
                }
                var itemsToSet = responseJson.success.token; 
                var profileData = responseJson.profileData;
                var userID = responseJson.userID;
                console.log("userid",userID);
                console.log(profileData);
                if(responseJson.status == 'valid'){
                    if(itemsToSet.length != 0 ){
                        this._signInAsync(itemsToSet,JSON.stringify(profileData),userID);
                        return;
                    }    
                }else{
                    this.setState({submitButtonDisable:false});
                    alert("Invalid Email or Password");
                }
                
                    console.log("resp:",itemsToSet);
                }).catch((error) => {
                    alert("Internal Server Error 500");
                    console.log("on error featching:"+error);
                    this.setState({submitButtonDisable:false});
            });
        }
        });
        console.log(connectionInfoLocal);
    }
    _signInAsync = async (token,profileData,userID) => {
        userID = userID + "";//converting to string
        console.log("setting token");
        await AsyncStorage.setItem('userToken', token);
        console.log("setting user data");
        await AsyncStorage.setItem('userID', userID);

        await AsyncStorage.setItem('userProfileData', profileData);
        console.log("sending to home");
        this.props.navigation.navigate('Home');
        console.log("seneing to app");
    };
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
        if(!this.validateEmail(this.state.reg_email.trim())){
            alert("Invalid Email! Try again!!!");
            return;
        }
        if(this.state.reg_password != this.state.reg_confirm){
            alert("Confirm password dont matched with previous one!!");
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
            fetch(Global.API_URL+'register_S', {
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
                    'user_type':'worker',
                     noti_token:Date()+"",

                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.error != undefined){
                    alert("Internal Server error 5004");
                    this.setState({reg_submitButtonDisable:false});
                    return;
                }
                var itemsToSet = responseJson.success.token; 
                var profileData = responseJson.profileData;
                var userID = responseJson.userID;
                if(responseJson.reg_done == 'yes'){
                    console.log("now calling to signin and sending to home");
                    this._signInAsync(itemsToSet,JSON.stringify(profileData),userID);
                    this.setState({reg_submitButtonDisable:false});
                    return;
                }else{
                    alert("Invalid Email or Password");
                    this.setState({reg_submitButtonDisable:false});
                }
                }).catch((error) => {
                    alert("Internal Server Error 500");
                    console.log("on error featching:"+error);
                    this.setState({reg_submitButtonDisable:false});
            });
        }
        });
        console.log(connectionInfoLocal);
    }
    validateEmail = (email) => {
        var re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validateName = (name)=>{
        return !/[^a-zA-Z ]/.test(name);
    }
    validatephone = (phone) =>{
        return /^[0-9]+$/.test(phone);
    }
    
    REGcheckName =(text)=>{
        // valdating name

        if(text.trim().length != 0){
            if(this.validateName(text) && text.length > 2){
                this.setState({
                    reg_name_valid_color:'green',
                    reg_name_valid_icon:'check-circle'
                });
                console.log("valid name");
            }else{
                this.setState({
                    reg_name_valid_color:'red',
                    reg_name_valid_icon:'close-circle'
                });
            }
        }
    }
    REGcheckEmail = (text) =>{
        // valdating email
        if(text.trim().length != 0 ){
            if(this.validateEmail(text) && text.length > 5){
                this.setState({
                    reg_email_valid_color:'green',
                    reg_email_valid_icon:'check-circle'
                });
                console.log("valid email");
            }else{
                this.setState({
                    reg_email_valid_color:'red',
                    reg_email_valid_icon:'close-circle'
                });
            }
        }
    }
    REGcheckPhone = (text) =>{
        //validation phone
        if(text.trim().length != 0){
            if(this.validatephone(text) && text.length == 10){
                this.setState({
                    reg_phone_valid_color:'green',
                    reg_phone_valid_icon:'check-circle'
                });
                console.log("valid phone");
            }else{
                this.setState({
                    reg_phone_valid_color:'red',
                    reg_phone_valid_icon:'close-circle'
                });
            }
        }
    }
    REGcheckPassword = (text) =>{
        //validating password
        if(text.trim().length != 0){
            if(text.length >= 4){
                this.setState({
                    reg_password_valid_color:'green',
                    reg_password_valid_icon:'check-circle'
                });
                console.log("valid password");
            }else{
                this.setState({
                    reg_password_valid_color:'red',
                    reg_password_valid_icon:'close-circle'
                });
            }
        }
    }
    REGcheckConfirm = (text) =>{
        if(this.state.reg_password == text){
            this.setState({
                reg_confirm_valid_icon:'check-circle',
                reg_confirm_valid_color:'green',
            })
        }else{
            this.setState({
                reg_confirm_valid_icon:'close-circle',
                reg_confirm_valid_color:'red',
            })
        }
    }
    checkAvilEmail = () =>{
        // now sending request to login
        console.log("Checking for avil email");

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
                fetch(Global.API_URL+'AvilEmail', {
                    method: 'POST',
                    headers: {},
                    body: JSON.stringify({
                        email:this.state.reg_email,
                        check:'email',
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    var itemsToSet = responseJson.data ;
                    console.log("resp:",itemsToSet);
                    if(itemsToSet.status == true){
                        this.setState({
                            avilEmail:true,
                        })
                    }else{
                        this.setState({
                            avilEmail:false,
                        })
                    }

                }).catch((error) => {
                        alert("Internal Server Error 500");
                        console.log("on error featching:"+error);
                });
            }
        });
    }
    checkAvilPhone = () =>{
        console.log("Checking for avil phone");
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
                fetch(Global.API_URL+'AvilPhone', {
                    method: 'POST',
                    headers: {},
                    body: JSON.stringify({
                        phone:this.state.reg_phone,
                        check:'phone',
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    var itemsToSet = responseJson.data ;
                    console.log("resp:",itemsToSet);
                    if(itemsToSet.status == true){
                        this.setState({
                            avilPhone:true,
                        })
                    }else{
                        this.setState({
                            avilPhone:false,
                        })
                    }

                }).catch((error) => {
                        alert("Internal Server Error 500");
                        console.log("on error featching:"+error);
                });
            }
        });
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
                                    <View style={{ width: width*(0.95), height: 300,backgroundColor:"#ffffff",borderRadius:15,borderColor:'#fff'}}>
                                        <TouchableOpacity onPress={()=>{this.setState({loginModelVisible:false})}}>
                                            <Icon name="close-circle-outline" style={{alignSelf:'flex-end',fontSize:30}}/>
                                        </TouchableOpacity>
                                        <Text style={{fontSize:30,alignSelf:'center'}}>Sign In</Text>
                                        <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                                            <Item regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                <Input 
                                                    placeholder='Email' 
                                                    onChangeText={(text) => this.setState({email_or_phone:text})}
                                                    textContentType='username'
                                                />
                                            </Item>
                                            <Item regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
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
                                    <View style={{ width: width*(0.95), height: 500,backgroundColor:"#ffffff",borderRadius:15,borderColor:'#fff'}}>
                                        <TouchableOpacity onPress={()=>{this.setState({signUpModelVisible:false})}}>
                                            <Icon name="close-circle-outline" style={{alignSelf:'flex-end',fontSize:30}}/>
                                        </TouchableOpacity>
                                        <Text style={{fontSize:30,alignSelf:'center'}}>Sign Up</Text>
                                        <View style={{ width: width*(0.85), alignSelf:'center',marginVertical:5}}>
                                            <Item regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                <Input 
                                                    placeholder='Full Name' 
                                                    onChangeText={(text) => {
                                                        this.REGcheckName(text);
                                                        this.setState({reg_name:text})
                                                    }}
                                                    textContentType='name'
                                                    returnKeyType='next'
                                                />
                                                <Icon name={this.state.reg_name_valid_icon} style={{color:this.state.reg_name_valid_color,fontSize:25}}/>
                                            </Item>
                                            { this.state.reg_name_valid_color == 'red' && 
                                                <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*Name Must be a Alphabate.</Text>
                                            }
                                            <Item  regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                <Input 
                                                    placeholder='Email' 
                                                    onChangeText={(text) => {
                                                        this.REGcheckEmail(text);
                                                        this.setState({reg_email:text})
                                                        this.checkAvilEmail();
                                                    }}
                                                    textContentType='emailAddress'
                                                    returnKeyType='next'
                                                    keyboardType='email-address'

                                                />
                                                <Icon name={this.state.reg_email_valid_icon} style={{color:this.state.reg_email_valid_color,fontSize:25}}/>
                                            </Item>
                                            { this.state.reg_email_valid_color == 'red' && 
                                                <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*Not a Valid Email Format.</Text>
                                            }
                                            { this.state.avilEmail == false && 
                                                <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*This email is already registered with us.</Text>
                                            }
                                            <Item regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                <Input 
                                                    placeholder='Phone NO'
                                                    onChangeText={(text) => {
                                                        this.REGcheckPhone(text);    
                                                        this.setState({reg_phone:text})
                                                        this.checkAvilPhone()
                                                    }}
                                                    textContentType='telephoneNumber'
                                                    returnKeyType='next'
                                                    keyboardType='numeric'   


                                                />
                                                <Icon name={this.state.reg_phone_valid_icon} style={{color:this.state.reg_phone_valid_color,fontSize:25}}/>
                                            </Item>
                                            { this.state.reg_phone_valid_color == 'red' && 
                                                <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*Phone no must be 10 Digit long.</Text>
                                            }
                                            { this.state.avilPhone == false && 
                                                <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*This moible no is already registered with us.</Text>
                                            }
                                            <Item regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                <Input 
                                                    placeholder='Password'
                                                    onChangeText={(text) => {
                                                        this.REGcheckPassword(text);
                                                        this.setState({reg_password:text})
                                                    }}
                                                    textContentType='password' 
                                                    returnKeyType='next'
                                                    secureTextEntry={true}
                                                />
                                                <Icon name={this.state.reg_password_valid_icon} style={{color:this.state.reg_password_valid_color,fontSize:25}}/>
                                            </Item>  
                                            { this.state.reg_password_valid_color == 'red' && 
                                                <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*Password Must be at least 4 character Long.</Text>
                                            }  
                                            <Item regular style={{marginVertical:2,borderRadius:15,paddingHorizontal: 7,}}>
                                                <Input 
                                                    placeholder='Confirm password'
                                                    onChangeText={(text) => {
                                                        this.REGcheckConfirm(text);
                                                        this.setState({reg_confirm:text})
                                                    }}
                                                    textContentType='password' 
                                                    returnKeyType='go'
                                                    onSubmitEditing={this.submitRegister}
                                                    secureTextEntry={true}
                                                />
                                                <Icon name={this.state.reg_confirm_valid_icon} style={{color:this.state.reg_confirm_valid_color,fontSize:25}}/>
                                            </Item>
                                            { this.state.reg_confirm_valid_color == 'red' && 
                                                <Text style={{color:'red',marginHorizontal:7,fontSize:12}}>*Confirm password Don't Matched.</Text>
                                            }                 
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