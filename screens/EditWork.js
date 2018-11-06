import React, { Component } from "react";
import { 
    Dimensions,
 Picker,
    StyleSheet,
    View
} from "react-native";
import { CheckBox,  } from 'react-native-elements'

import { Container, Content, List, ListItem, Button, Label, Accordion,Text , Card,Header,Form,Item,Input } from 'native-base'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const {height,width} = Dimensions.get('window');

export default class EditWork extends Component {
    static navigationOptions = {
        title:"Edit Work"
    };
    
    constructor(props) {
        super(props)
    
        this.state = {
            state:"",
            selected:"0",
            StartHour:'10',
            StartMin:'00',
            EndHour:'04',
            EndMin:'00',
            checked:true
        }
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
    
    _renderContent(content) {
        console.log("rader prob");
        console.log(content.content);
        return (
            
            <List dataArray={content.content}
            renderRow={(item) =>
              <ListItem style={{padding:0,margin:0}}>
                <CheckBox
                center
                title={item.data}
                checked={true}
                />
              </ListItem>
            }>
          </List>
        );
    }

    render() {
    var items2 = [
            {A:'State',B:'Bihar'},
            {A:'City',B:'BGP'},
            {A:'PinCode',B:'812001'},
            {A:'Address',B:'Nayabazar,Near Hanuman Mandir, House no:31'},
        ];
        
        
        
        
        
  
        
        
        
        const dataArray = [
            { title: "Repair", content: [
                    {data:"Electronic appliances",id:"1"},
                    {data:"Home wiring",id:"2"},
                    {data:"Computer, laptops",id:"3"},
                    {data:"Furnitures, laptops",id:"4"},
                ] 
            },
            { title: "Software", content: [
                    {data:"Computer format",id:"4"},
                    {data:"Drivers",id:"5"},
                    {data:"Misc services",id:"6"}
                ] 
            },
            
          ];
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
                                selectedValue={this.state.selected}
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
                                    <Picker.Item label="59" value="09" />
                            </Picker>
                            <Picker
                                
                                mode="dropdown"
                                style={{  width: 50, height:32 ,backgroundColor:'#eaf1f4' }}
                                selectedValue={this.state.selected}
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
                                    <Picker.Item label="59" value="09" />
                            </Picker>
                            <Picker
                                
                                mode="dropdown"
                                style={{  width: 50, height:32 ,backgroundColor:'#eaf1f4' }}
                                selectedValue={this.state.selected}
                                >
                                    <Picker.Item label="AM" value="AM" />
                                    <Picker.Item label="PM" value="PM" />
                            </Picker>

                        </Item>
                    </Form>
                    {/* workng hour section:end */}

                </List>

                {/* Working Detailis:start */}
                <List>
                    <ListItem itemDivider>
                        <Text>Work you Know?</Text>
                    </ListItem>                    
                    <Accordion
                        dataArray={dataArray}
                        renderContent={this._renderContent}
                    />
                </List>
                {/* working details:end */}
                <Card>
                    <Button block dark >
                        <Text>Save</Text>
                    </Button>
                </Card>
                
                  
                    

                

                
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
});
