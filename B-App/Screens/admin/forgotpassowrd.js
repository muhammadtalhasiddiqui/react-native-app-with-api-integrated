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
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../Components/Footer';
import { Form, Item, Label, Input, Button, Thumbnail } from 'native-base';
import { connect } from "react-redux";
import { send_pin, change_password } from "../../store/action/authAction";
import { ActiveLoader } from '../Components/Loader';


const colors = ['#7d07c4', '#aa068e'];
const gColors = ['#7d07c4', '#aa068e'];
const placeholderColor = 'grey'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      newPassword: "",
      pinCode: ""
    }
  }
  componentDidMount = () => {

  }

  sendPin = () => {
    const { email } = this.state
    if (email !== "") {

      var Data = new FormData()
      
      Data.append('action','forget_password')
      Data.append('email',email)

       
       console.log("======signin data=====>", Data)
      
       fetch("http://www.hnhtechsolutions.com/waqarkhan/wedding_planet/api/forget_password_api.php", {
         method: 'POST',
         headers: {
           'content-Type': 'multipart/form-data'
         },
         body: Data
       }).then(res => res.json())
         .then(resp => {alert(resp.message)
         })
      
    } else {
      alert("Email address is required")
    }
  }
  submitForm = () => {
    const { email, newPassword, pinCode } = this.state
    if (newPassword && pinCode) {
      
      var Data = new FormData()
      
      Data.append('action','forgot_password_submit')
      Data.append('email',email)
      Data.append('token',pinCode)
      Data.append('password',newPassword)

       
       console.log("======signin data=====>", Data)
      
       fetch("http://www.hnhtechsolutions.com/waqarkhan/wedding_planet/api/forget_password_api.php", {
         method: 'POST',
         headers: {
           'content-Type': 'multipart/form-data'
         },
         body: Data
       }).then(res => res.json())
         .then(resp => {
           if(resp.status==true){
             this.props.navigation.navigate('Login')
           }
         })
      
    } else {
      alert("All fields are required")
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 15 }}>
          <Image style={styles.imglogo} source={require('../../assets/logo.png')} />
          <Text style={{ fontSize: 17, textAlign: 'right' }}>Forgot Password</Text>
          <Item style={styles.inputMain}>
            <Input placeholder="Email" value={this.state.email} onChangeText={(email) => this.setState({ email })} style={styles.inputTxt} placeholderTextColor={placeholderColor} />
          </Item>
          <TouchableOpacity style={{ alignSelf: 'flex-end', height: "6%", marginHorizontal: 10, marginTop: 10 }} onPress={() => this.sendPin()}>
            <LinearGradient style={{ alignItems: 'center', justifyContent: 'center', height: "100%", paddingHorizontal: 10, borderRadius: 4 }} colors={colors}>
              <Text style={{ fontSize: 14, textAlign: 'center', color: 'white' }}>Send Pin</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Item style={[styles.inputMain, { marginTop: 5 }]}>
            <Input style={styles.inputTxt} onChangeText={(pinCode) => this.setState({ pinCode })} disabled={!this.props.forgetPassword ? true : false} secureTextEntry placeholder='Enter Pin Code' placeholderTextColor={placeholderColor} />
          </Item>

          <Item style={styles.inputMain}>
            <Input style={styles.inputTxt} onChangeText={(newPassword) => this.setState({ newPassword })} disabled={!this.props.forgetPassword ? true : false} secureTextEntry placeholder='New Password' placeholderTextColor={placeholderColor} />
          </Item>
          {
            this.props.progress ? <View style={{ marginVertical: 20 }}>
              <ActiveLoader />
            </View> :
              <TouchableOpacity onPress={this.submitForm}>
                <Text style={[styles.bigTxt, { marginTop: 30, alignSelf: 'center' }]}>Submit</Text>
              </TouchableOpacity>
          }

          {
            this.props.error ? <Text style={{fontSize: 14, color: "red", textAlign: "center", marginVertical: 10}}>You may have written something wrong! </Text> : null
          }
        </ScrollView>

        {/* <Footer /> */}
      </View>
    );
  }
}


const mapStateToProps = state => {
  console.log(state.authReducer)
  return {
    progress: state.authReducer.progress,
    error: state.authReducer.error,
    forgetPassword: state.authReducer.forgetPassword
  }
}

let mapDispatchToPops = dispatch => {
  return {
    pin: (data) => {
      dispatch(send_pin(data))
    },
    submit: (data) => {
      dispatch(change_password(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToPops)(ForgotPassword)

const styles = StyleSheet.create({
  inputMain: {
    borderBottomColor: gColors[0],
    height: 50,
    marginTop: 25,
    marginLeft: 0,
    borderBottomWidth: 1,
  },
  imglogo: {
    width: 250,
    height: 150,
    alignSelf: 'center',
    marginTop: '10%'
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
  }
});
