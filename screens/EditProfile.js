import React, { Component } from "react";
import { 
    Dimensions,
    Picker,
    StyleSheet
} from "react-native";
import { Container, Content, Form, Item, Label, Input, Textarea, Button,Text ,CardItem, Left, Right } from 'native-base'

const {height,width} = Dimensions.get('window');

export default class EditProfile extends Component {
    static navigationOptions = {
        title:"Edit Profile",
      };
      
  constructor(props) {
    super(props)

    this.state = {
        state:"",
    }
}

    render() {
       
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel style = {styles.item}>
                            <Label>Name</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style = {styles.item}>
                            <Label>Phone No</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style = {styles.item}>
                            <Label>City</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style = {styles.item}>
                            <Label>PinCode</Label>
                            <Input />
                        </Item>
                        <Item style = {styles.item}>
                            <Label>Address:</Label>
                            <Textarea rowSpan={3} bordered style={{width:width*(3/4)}} />
                        </Item>
                        <Item style = {styles.item}>
                            <Label>State</Label>
                            <Right>
                            <Picker
                                selectedValue={this.state.state}
                                style={{ height: 50, width: width*(3/4) , backgroundColor:'#eaf1f4' }}
                                onValueChange={(itemValue, itemIndex) => this.setState({state: itemValue})}>
                                <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
                                <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
                                <Picker.Item label="Assam" value="Assam" />
                                <Picker.Item label="Bihar" value="Bihar" />
                                <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
                                <Picker.Item label="Goa" value="Goa" />
                                <Picker.Item label="Gujarat" value="Gujarat" />
                                <Picker.Item label="Haryana" value="Haryana" />
                                <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
                                <Picker.Item label="Jammu & Kashmir" value="Jammu & Kashmir" />
                                <Picker.Item label="Jharkhand" value="Jharkhand" />
                                <Picker.Item label="Karnataka" value="Karnataka" />
                                <Picker.Item label="Kerala" value="Kerala" />
                                <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
                                <Picker.Item label="Maharashtra" value="Maharashtra" />
                                <Picker.Item label="Manipur" value="Manipur" />
                                <Picker.Item label="Meghalaya" value="Meghalaya" />
                                <Picker.Item label="Mizoram" value="Mizoram" />
                                <Picker.Item label="Nagaland" value="Nagaland" />
                                <Picker.Item label="Odisha" value="Odisha" />
                                <Picker.Item label="Punjab" value="Punjab" />
                                <Picker.Item label="Rajasthan" value="Rajasthan" />
                                <Picker.Item label="Sikkim" value="Sikkim" />
                                <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
                                <Picker.Item label="Telangana" value="Telangana" />
                                <Picker.Item label="Tripura" value="Tripura" />
                                <Picker.Item label="Uttarakhand" value="Uttarakhand" />
                                <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                                <Picker.Item label="West Bengal" value="West Bengal" />

                            </Picker>
                            </Right>
                        </Item>
                        
                        <Button block bordered style={{ margin:20}}>
                            <Text>Primary</Text>
                        </Button>
                        
                        
                    </Form>
                </Content>
            </Container>
        );
    }
}

/*
    name
    phoneno
    state
    city
    princode
    address
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item:{
       paddingTop: 5,
    }
});