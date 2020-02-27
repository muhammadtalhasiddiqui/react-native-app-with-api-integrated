import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Footer from '../Components/Footer';
import { Form, Item, Label, Input,Spinner } from 'native-base';
import { connect } from "react-redux";
import { signup } from "../../store/action/authAction";
import { ActiveLoader } from '../Components/Loader';


const gColors = ['#7d07c4', '#aa068e'];
const placeholderColor = 'grey'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      password: undefined,
      contact: undefined,
      loader:false
    }
  }

  componentDidMount() {

  }

  submitForm = () => {
    this.setState({loader:true})
    const { name, email, password, contact } = this.state;
    // const Data = { 
    //   name:name, 
    //   email : email, 
    //   password:password,
    //    contact : contact
    // }
if(name!=undefined, email!=undefined, password!=undefined, contact!=undefined)
{
  var Data = new FormData()

  // const file = [this.state.responce]
  
   Data.append('action','signup')
   Data.append('name', name)
   Data.append('email', email)
   Data.append('password', password)
   Data.append('contact', contact)
  console.log("======main data=====>", Data)
  
   fetch("http://www.hnhtechsolutions.com/waqarkhan/wedding_planet/api/singup.php", {
     method: 'POST',
     headers: {
       'content-Type': 'multipart/form-data'
     },
     body: Data
   }).then(res => res.json())
     .then(resp => {
       if(resp.status==true){  
         this.setState({loader:false},()=>{this.props.navigation.navigate('Login')}
     
     )
  
    }
    else(alert(resp.messege))
  })
     .catch((err) => { alert('error', err) })
}

else{
  this.setState({loader:false},()=>{  alert('make sure your input fields are filled properly')})

}
 
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 15 }}>
          <Image style={styles.imglogo} source={require('../../assets/logo.png')} />
          <Item style={styles.inputMain}>
            <Input placeholder="Name" onChangeText={(name) => this.setState({ name })} style={styles.inputTxt} placeholderTextColor={placeholderColor} />
          </Item>
          <Item style={styles.inputMain}>
            <Input style={styles.inputTxt} onChangeText={(email) => this.setState({ email })} keyboardType="email-address" placeholder='Email' placeholderTextColor={placeholderColor} />
          </Item>

          <Item style={styles.inputMain}>
            <Input style={styles.inputTxt} onChangeText={(password) => this.setState({ password })} secureTextEntry={true} placeholder='Password' placeholderTextColor={placeholderColor} />
          </Item>

          <Item style={styles.inputMain}>
            <Input style={styles.inputTxt} onChangeText={(contact) => this.setState({ contact })} keyboardType="phone-pad" placeholder='Contact' placeholderTextColor={placeholderColor} />
          </Item>

          {
            this.props.progress ? <View style={{ marginVertical: 20 }}>
              <ActiveLoader />
            </View> :
              <TouchableOpacity onPress={this.submitForm}>
              {this.state.loader==true && <Spinner color='purple'/>}
                <Text style={[styles.bigTxt, { marginTop: 30, alignSelf: 'center' }]}>Sign Up</Text>
              </TouchableOpacity>
          }

        </ScrollView>
        {/* <Footer /> */}
      </View>
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
  // console('data',data);
  return {
    submit: (data) => {
      dispatch(signup(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToPops)(SignUpForm)

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
