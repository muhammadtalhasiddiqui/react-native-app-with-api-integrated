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
import Footer from '../Components/Footer';
import Header from '../Components/header';
import { Form, Item, Label, Input,Spinner } from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
// import console = require('console');

const gColors = ['#7d07c4', '#aa068e'];
const placeholderColor = 'grey'

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      baseImg:null,
      lat: this.props.navigation.getParam('lat'),
      lng: this.props.navigation.getParam('lng'),
      fadd: this.props.navigation.getParam('fadd'),
      loader:false
    }
  }
 
  imagesPicker = () => {
    ImagePicker.openPicker({
        multiple: true,
        mediaType: "photo"
    }).then(images => {
        images.map((img) => {
            this.setState({path:img.path},()=>{ this.urlToBlob(this.state.path)})
               
          console.log('*********check***********',img.path)
      })
        // this.setState({ baseImg: [...this.state.baseImg, images.path] })
        // this.state.baseImg.push(images)
    });
  
  }


  urlToBlob = async (url) => {

    console.log('******************uri********',url)
    
      const blob = await new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
              resolve(xhr.response);
          };
          xhr.onerror = function (e) {
              reject(new TypeError("Network request failed"))
          }
          xhr.responseType = 'blob'; // convert type
          xhr.open('GET', url, true);
          xhr.send(null);
      })
    
      var uriImg = blob.data.name
      console.log(uriImg, 'uurrriii')
      this.setState({uri:uriImg})
      // this.setState({ images: [...this.state.images, uriImg] },()=>{console.log(this.state.images, 'bloooob')})
     
    }
    
submit=()=>{
this.setState({loader:true});
const {name,noOfPerson,Location,Price,path,uri} = this.state;

if (name!=undefined,noOfPerson!=undefined,Location!=undefined,Price!=undefined,path!=undefined)
{
  console.log('**************please wait ***************',uri)
console.log('*************uri and path****************',uri,path);

var file1 = {
uri: path,
name: uri,
type: 'image/png'
}

  console.log('*****************PLEASE WAIT***********************',file1);

// ___________________________________________________


var Data = new FormData()

// const file = [this.state.responce]

 Data.append('action','create_planet')
 Data.append('name', name)
 Data.append('persons', noOfPerson)
 Data.append('location', Location)
 Data.append('price', Price)
 Data.append('file',file1)
 console.log("======main data=====>", Data)

 fetch("https://hnhtechsolutions.com/waqarkhan/wedding_planet/api/create_planet.php", {
   method: 'POST',
   headers: {
     'content-Type': 'multipart/form-data'
   },
   body: Data
 }).then(res => res.json())
   .then(resp => {
console.log(resp.messege)
if(resp.status==true){
this.setState({loader:false},()=>{alert(resp.messege)})
  
}
     

   })
   .catch((err) => { alert('error', err) })
}

else(alert('please fill all fields'))
// this.setState({ modalVisible: true })

// _______________________________________________________________________________________
}




  render() {
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

        <Header title="Create New Planet" />
        <ScrollView>

          <Form style={{ padding: 15 }}>
            <Label style={styles.bigTxt}>Required</Label>
            <Item style={styles.inputMain}>
              <Input placeholder="Name" onChangeText={(text)=>{this.setState({name:text})}} style={styles.inputTxt} placeholderTextColor={placeholderColor} />
            </Item>
            <Item style={styles.inputMain}>
              <Input style={styles.inputTxt} onChangeText={(text)=>{this.setState({noOfPerson:text})}} keyboardType="number-pad" placeholder='Number of Persons' placeholderTextColor={placeholderColor} />
            </Item>

            <Item onPress={() => this.props.navigation.navigate("pickLocation")}
              style={styles.inputMain}>
             <Input style={styles.inputTxt} onChangeText={(text)=>{this.setState({Location:text})}} placeholder='Location' placeholderTextColor={placeholderColor} />
              <Image source={require('../../assets/location-pin.png')} style={{ height: 30, width: 30 }} />
              {/* <EvilIcons style={{ flex: 1 }} name="location" color={color} size={28} /> */}
            </Item>

            <Item
              style={styles.inputMain}>
              <Label style={[styles.inputTxt, { flex: 1, color: placeholderColor }]}>Gallery</Label>

              <TouchableOpacity onPress={this.imagesPicker}>
                <LinearGradient style={{borderRadius:4,paddingVertical:2,paddingHorizontal:14}} colors={gColors}>
                  <Text style={{fontSize:10,color:'white',fontWeight:'bold'}}>Upload</Text>
                </LinearGradient>
              </TouchableOpacity>

            </Item>

            <Item style={styles.inputMain}>
              <Input style={styles.inputTxt} onChangeText={(text)=>{this.setState({Price:text})}} keyboardType="number-pad" placeholder='Price' placeholderTextColor={placeholderColor} />
            </Item>
            {this.state.loader==true && <Spinner color='purple' style={{marginBottom:25}}/>}
            <TouchableOpacity onPress={this.submit}>
              <Text style={[styles.bigTxt, { marginTop: 30, alignSelf: 'center' }]}>Submit</Text>
            </TouchableOpacity>
            
          </Form>

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
    borderBottomWidth: 1
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
