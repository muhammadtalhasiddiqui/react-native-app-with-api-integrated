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

  TouchableHighlight
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import LineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Footer from '../Components/Footer';
import { SliderBox } from "react-native-image-slider-box";
import { Input, Button } from 'native-base';

const colors = ['#7d07c4', '#aa068e'];

let components = [
  // {
  //   id: 1,
  //   text: 'Enquiries',
  //   src: require('../..//assets/Enquiries.png')
  // },

  {
    id: 2,
    text: "Today's Event",
    src: require('../../assets/calender.png'),
  },
  {
    id: 3,
    text: 'Appointments',
    src: require('../../assets/appointment.png'),
  },
  {
    id: 4,
    text: 'Follow Ups',
    src: require('../../assets/follow.png'),
  },
  {
    id: 5,
    text: 'GST Payble',
    src: require('../../assets/payment-01.png'),
  },
  {
    id: 6,
    text: 'My Clients',
    src: require('../../assets/client.png'),
  },

];

export default class PlanetDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [
       
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?tree", // Network image
   

      ],
      color: 'white',
      color1: 'white'
    }
  }

  componentDidMount = () => {

    var Data = new FormData()
    
    Data.append('action','get_rec_by')
    Data.append('id',this.props.navigation.state.params.ID)
  
     
     console.log("======planet data=====>", Data)
    
     fetch("http://www.hnhtechsolutions.com/waqarkhan/wedding_planet/api/view_planet.php", {
       method: 'POST',
       headers: {
         'content-Type': 'multipart/form-data'
       },
       body: Data
     }).then(res => res.json())
       .then(resp => {this.setState({name:resp.user[1].name , capacity : resp.user[1].persons, location : resp.user[1].location, price:resp.user[1].price, waiter: resp.user[1].p_id}  )
       var imgArr= resp.user[1].img
       let imageArr = JSON.parse(imgArr)
         console.log(typeof imageArr, imageArr)
       for(var i=0  ; i<= imageArr.length; i++){
       this.setState({image:imageArr[i]},()=>{
        //  console.log('aaaaagya',this.state.image)
         this.state.images.push(`http://www.hnhtechsolutions.com/waqarkhan/wedding_planet/api/upload/${this.state.image}`);
       })
       }
    })

}


  render() {
    console.log('nnnnnn*******************8',this.state.images);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={colors}>
          {/* <StatusBar barStyle={'light-content'} backgroundColor={'#b00589'} /> */}
          <View
            style={{
              height: 65,
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>

            <View style={{ flex: 5 }}>
              <Text style={{ alignSelf: 'center', fontSize: 28, color: 'white' }}>
             Planet Detail
              </Text>

            </View>

            <View style={{ flex: 1 }}>
            </View>
          </View>
        </LinearGradient>
        <ScrollView style={{ marginBottom: 52 }}>

          <SliderBox images={this.state.images} />
          <View style={styles.start}>
            <Text style={{ color: '#731991', fontWeight: 'bold', fontSize: 40, borderBottomColor: '#731991', border: 1, borderBottomWidth: 2 }}>{this.state.name}</Text>

          </View>

          <View style={styles.mView}>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Location:</Text><Text style={{marginTop:15,marginLeft:10,fontWeight:'bold'}}>{this.state.location}</Text>
          </View>
          <View style={styles.mView}>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Capacity:</Text><Text style={{marginTop:15,marginLeft:10,fontWeight:'bold'}}>{this.state.capacity} person</Text>
          </View>
          <View style={styles.mView}>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Waiter:</Text><Text style={{marginTop:15,marginLeft:10,fontWeight:'bold'}}>{this.state.waiter}</Text>
          </View>
          <View style={styles.mView}>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Price:</Text><Text style={{marginTop:15,marginLeft:10,fontWeight:'bold'}}>{this.state.price}</Text>
          </View>
          <View style={styles.mView}>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Available:</Text><Input />
          </View>
          <View>
            <Button onPress={() => { this.props.navigation.navigate('myplanets') }} style={{ backgroundColor: 'red', paddingLeft: '30%', paddingRight: '25%' }}><Text style={{ color: 'white', fontSize: 20 }}>Parking available</Text></Button>
          </View>

          <View style={styles.bot}>

            <TouchableHighlight onPress={() => { this.setState({ color: 'yellow' }) }}>
              <Text style={{ color: this.state.color, fontSize: 30 }}>Message</Text>
            </TouchableHighlight>
            <Text style={{ fontSize: 25, color: 'white' }}>|</Text>
            <TouchableHighlight onPress={() => { this.setState({ color1: 'yellow' },()=>{this.props.navigation.navigate('bookingPanel')}) }}>
              <Text style={{ color: this.state.color1, fontSize: 30 }}>Book now</Text>
            </TouchableHighlight>

          </View>


        </ScrollView>
        <Footer logout={this.props.submit} />
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  headView: { height: 40, marginTop: 10, paddingLeft: 20 },
  rView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  to: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 3,
    // marginLeft: Dimensions.get('screen').width - 220,
  },
  gradient: {
    flex: 0.97,
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 20
  },
  gView: {
    borderStyle: 'solid',
    borderRightWidth: 12,
    borderTopWidth: 40,
    borderTopColor: 'white',
    borderRightColor: 'transparent',
    flex: 0.1
  },
  mView: {
    flexDirection: 'row',
    width: '95%',
    marginLeft: 20
  },

  title: { color: 'white' },
  start: {
    alignSelf: 'center',

  },
  bot: {
    width: '100%',
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '10%',
    paddingRight: '10%',
    marginTop: 10,
    marginBottom: 2
  }
});
