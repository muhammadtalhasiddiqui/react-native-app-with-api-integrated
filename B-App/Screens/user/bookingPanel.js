import React from 'react';
import {
  SafeAreaView,
  View,
  Icons,
  Dimensions,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import Footer from '../Components/Footer';
import Header from '../Components/header';
import Calender from '../Components/calender';
import { Form, Item, Label, Input, CheckBox, ListItem, Body,Spinner } from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const gColors = ['#7d07c4', '#aa068e'];
const placeholderColor = 'grey'

export default class bookingPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      lat: this.props.navigation.getParam('lat'),
      lng: this.props.navigation.getParam('lng'),
      fadd: this.props.navigation.getParam('fadd'),
      calendarVisible: false,
      name: '',
      nopsns: '',
      theme: '',
      date: '',
      sound: false,
      light: false,
      otherReq: '',
      loader:false
    }
  }
  componentDidMount = () => {

  }

  setCalendarVisible = (boolvar) => {
    console.log("setCalender Visible: ", boolvar)
    this.setState({ calendarVisible: boolvar })
  }

submit=()=>{
  const {name,noOfP,theme,calender,sound,otherReq,light} = this.state;
this.setState({loader:true})
if(name !='',noOfP!='',theme!='',calender!='',light!=''){
  
  var Data = new FormData()
  Data.append('action','create_booking')
  Data.append('name',name)
  Data.append('persons',noOfP)
  Data.append('theme',theme)
  Data.append('date',calender)
  Data.append('sound',sound)
  Data.append('focus_light',light)
  Data.append('o_requirement',otherReq)
  
   
   console.log("======booking data=====>", Data)
  
   fetch("http://hnhtechsolutions.com/waqarkhan/wedding_planet/api/booking_planet.php", {
     method: 'POST',
     headers: {
       'content-Type': 'multipart/form-data'
     },
     body: Data
   }).then(res => res.json())
     .then(resp => {this.setState({ modalVisible: true },()=>{this.setState({loader:false})})
})

}
else(
  
  this.setState({loader:false},()=>{ alert('all fields are reaquired')})
 
)


 
  
}

  render() {
    console.log("Name: ", this.state.name, "nopsns: ", this.state.nopsns, "Theme: ", this.state.theme, "Sound:", this.state.sound, "Light: ", this.state.light, "Other Requirements: ", this.state.otherReq)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false })
          }}>
          <View style={styles.modalMain}>
            <LinearGradient colors={gColors} style={styles.gradientModal}>
              <View style={styles.flexContainerModal}>
                <Text style={styles.modalText}>Planet has been created!</Text>
              </View>

              <View style={styles.flexContainerModal}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}>
                  <Text style={styles.modalBtn}>OK</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </Modal>
        <Calender press={this.setDate} visible={this.state.calendarVisible} invisible={this.setCalendarVisible} />

        <Header title="Booking Panel" />
        <ScrollView>

          <Form style={{ padding: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Label style={styles.bigTxt}>All Fields are Required</Label>
              <Label style={{ color: gColors[0], fontSize: 15, fontWeight: 'bold' }}>Price {'\n'}$0.00</Label>
            </View>
            <Item style={styles.inputMain}>
              <Input onChangeText={(name) => this.setState({ name })} placeholder="Your Name" style={styles.inputTxt} placeholderTextColor={placeholderColor} />
            </Item>
            <Item style={styles.inputMain}>
              <Input onChangeText={(noOfP) => this.setState({ noOfP })} style={styles.inputTxt} keyboardType="number-pad" placeholder='Number of Persons' placeholderTextColor={placeholderColor} />
            </Item>
            <Item style={styles.inputMain}>
              <Input onChangeText={(theme) => this.setState({ theme })} style={styles.inputTxt} placeholder='Event Theme' placeholderTextColor={placeholderColor} />
            </Item>

            <Item style={styles.inputMain}>
              <Input onChangeText={(calender) => this.setState({ calender })} style={styles.inputTxt} placeholder='Calender' placeholderTextColor={placeholderColor} />
              <Ionicons name='md-calendar' size={28} color='grey' />
            </Item>

            <View style={styles.checkBoxContainer}>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Sound</Text>
                <CheckBox color='#D593F2' style={styles.checkBox} checked={this.state.sound} onPress={() => this.setState({ sound: !this.state.sound })} />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Focus Lights</Text>
                <CheckBox color='#D593F2' style={styles.checkBox} checked={this.state.light} onPress={() => this.setState({ light: !this.state.light })} />
              </View>
            </View>

            <View style={{ borderColor: gColors[0], marginLeft: 0, borderWidth: 2, height: 90, width: '100%', borderRadius: 4 }}>
              <Input onChangeText={(otherReq) => this.setState({ otherReq })} style={styles.inputTxt} placeholder='Other requirements' placeholderTextColor={placeholderColor} />
            </View>
          </Form>
{this.state.loader==true && <Spinner color='purple'/>}
          <TouchableOpacity onPress={this.submit}>
              <Text style={[styles.bigTxt, { marginTop: 30,marginBottom:'20%', alignSelf: 'center' }]}>Submit</Text>
            </TouchableOpacity>

        </ScrollView>
        <Footer />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputMain: {
    borderBottomColor: gColors[0],
    height: 50,
    marginTop: 30,
    marginLeft: 0,
    borderBottomWidth: 2
  },
  checkBoxContainer: {
    height: 50,
    marginTop: 30,
    // marginLeft: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '55%',
    alignSelf: 'center'
  },
  inputTxt: {
    fontWeight: 'bold',
    fontSize: 16
  },
  bigTxt: {
    color: gColors[0],
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  modalMain: {
    backgroundColor: 'rgba(0,0,0,.6)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradientModal: {
    width: '50%',
    height: '30%',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 35,
    justifyContent: 'center'
  },
  flexContainerModal: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  modalBtn: {
    textDecorationLine: 'underline',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 20
  },
  searchBarMain: {
    width: "95%",
    height: 50,
    padding: 15,
    alignSelf: 'center',
    marginVertical: 10,
 
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center'
  }, searchBar: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'lightgrey'
  },
  searchBar: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'lightgrey'
  },
});
