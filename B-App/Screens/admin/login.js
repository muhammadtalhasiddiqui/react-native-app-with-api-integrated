import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Form, Item, Label, Input,Spinner } from 'native-base';
import { connect } from "react-redux";
import { login } from "../../store/action/authAction";
import { ActiveLoader } from '../Components/Loader';


const gColors = ['#7d07c4', '#aa068e'];
const placeholderColor = 'lightgrey'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loader: false
    }
  }

  submitForm = () => {
    this.setState({loader:true})
    const { email, password } = this.state
    if (email && password) {
      const data = { email, password }
      

      var Data = new FormData()
      
      Data.append('action','login')
      Data.append('email',email)
      Data.append('password',password)
       
       console.log("======signin data=====>", Data)
      
       fetch("http://www.hnhtechsolutions.com/waqarkhan/wedding_planet/api/singup.php", {
         method: 'POST',
         headers: {
           'content-Type': 'multipart/form-data'
         },
         body: Data
       }).then(res => res.json())
         .then(resp => {
// console.log('resp',resp)
    if(resp.status ==true){
      this.setState({loader:false},()=>{this.props.navigation.navigate('App')})
      
    }

    else{ this.setState({loader:false},()=>{alert('invalid id or password')})}
         })
         .catch((err) => { console.log('error', err) })


    } else {
      this.setState({loader:false},()=>{  alert('please fill all fields')})
    
    }
// {this.props.navigation.navigate('Admin')}
   
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={styles.imgbg} source={require('../../assets/loginbg.jpg')}>
          <Image style={styles.imglogo} source={require('../../assets/logo.png')} />
          <View style={styles.inputContainer}>
            <Item style={styles.inputMain}>
              <Input  placeholder="Username" onChangeText={(email) => this.setState({email})} style={styles.inputTxt} placeholderTextColor={placeholderColor} />
            </Item>
            <Item style={styles.inputMain}>
              <Input style={styles.inputTxt} onChangeText={(password) => this.setState({password})} secureTextEntry={true} placeholder='Password' placeholderTextColor={placeholderColor} />
            </Item>
            <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 5 }} onPress={() => this.props.navigation.navigate('ForgotPassowrd')}>
              <Text style={styles.linktxt}>Forgot Password?</Text>
            </TouchableOpacity>
            {this.state.loader==true&&<Spinner/>}
            <TouchableOpacity onPress={this.submitForm}>
              <Text style={[styles.bigTxt, { marginTop: 10, alignSelf: 'center' }]}>Sign in</Text>
            </TouchableOpacity>
          </View>

          {
            this.props.progress ? <View style={{ marginVertical: 20 }}>
              <ActiveLoader />
            </View> :
              <TouchableOpacity style={{ alignSelf: 'center', marginTop: 5, width: '90%' }} onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={[styles.linktxt, { textAlign: 'right' }]}>Sign Up new Account?</Text>
              </TouchableOpacity>
          }
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    progress: state.authReducer.progress,
    error: state.authReducer.error
  }
}

let mapDispatchToPops = dispatch => {
  return {
    submit: (data) => {
      dispatch(login(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToPops)(LoginForm)
const styles = StyleSheet.create({
  imgbg: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  }, imglogo: {
    width: 250,
    height: 150,
    alignSelf: 'center',
    marginTop: '10%'
  },
  inputContainer: {
    backgroundColor: 'black',
    height: '50%',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '90%',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'blue',
    elevation: 6,
    marginTop: '10%'
  },
  inputMain: {
    borderBottomColor: gColors[0],
    height: 50,
    marginTop: 30,
    marginLeft: 0,
    borderBottomWidth: 1,
   
  },
  inputTxt: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'white'
  },
  bigTxt: {
    color: placeholderColor,
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  linktxt: {
    color: placeholderColor,
    fontSize: 14,
    fontWeight: 'bold'
  }
});
