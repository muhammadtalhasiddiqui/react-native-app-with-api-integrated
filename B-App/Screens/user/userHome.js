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
import { Form, Item, Label, Input, Icon,Spinner } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { SliderBox } from "react-native-image-slider-box";

const defaultColor = '#7d07c4'
const colors = ['#7d07c4', '#aa068e'];


export default class Home extends React.Component {
  constructor(props) {
    super(props)

this.state={

  data : [],
  images: [
       
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?tree", // Network image


  ],
loader:false

}


  }
  componentDidMount = () => {
this.setState({loader:true})
      var Data = new FormData()
      
      Data.append('action','get_allplanet_record')
    
       
       console.log("======signin data=====>", Data)
      
       fetch("http://www.hnhtechsolutions.com/waqarkhan/wedding_planet/api/view_planet.php", {
         method: 'POST',
         headers: {
           'content-Type': 'multipart/form-data'
         },
         body: Data
       }).then(res => res.json())
         .then(resp => {
          this.setState({data:resp.user},()=>{this.setState({loader:false})})
        var imgArr= resp.user[0].img
        let imageArr = JSON.parse(imgArr)
          console.log(typeof imageArr, imageArr)
        for(var i=0  ; i<= imageArr.length; i++){
        this.setState({image:imageArr[i]},()=>{
          this.state.images.push(`http://www.hnhtechsolutions.com/waqarkhan/wedding_planet/api/upload/${this.state.image}`);
        })
        }
// resp.user[0].img.map((i)=>{
//   console.log('img**********',i)
// })
         
        })
          

  }



  goto = (screen) => {
    // this.props.navigation.navigate('userNotifications')
    alert('yuff')
  }
  render() {
    console.log('concadddd',this.state.data)

    const {data}=this.state;
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={colors}>
          {/* <StatusBar barStyle={'light-content'} backgroundColor={'#b00589'} /> */}
          <View
            style={{
              height: 65,
              flexDirection: 'row',
              marginHorizontal: 20,
          
              // alignSelf:'center',
              justifyContent: 'space-between'
            }}>

            
              <Text style={{fontSize: 28,marginLeft:'20%',marginTop:15, color: 'white' }}>
                Home
              </Text>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('userNotifications')}}>
                <Icon style={{color:'red',width:40,marginVertical:20}} name='md-notifications' />
              </TouchableOpacity>
         
          </View>
        </LinearGradient>
        {/* <Header title='Home' gotoNotify={()=>{this.props.navigation.navigate('userNotifications')}}/> */}
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.searchBarMain}>
            <Input style={styles.searchBar} placeholder='Search Planet' placeholderTextColor='grey' />
            <Ionicons name='md-search' size={28} color={defaultColor} />
          </View>

         {data != undefined && <FlatList
            data={data}
            renderItem={({ item, i }) =>
              // data.map((item,i) => {
              // return(
               
              <View style={{ marginBottom: 10 }} key={i}>
              {console.log('tags',item.img)}
              <SliderBox images={this.state.images} />
                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                  <View>
                    <Text style={styles.bigTxt}>{item.name}</Text>
                    <Text>Capacity {item.persons} psn</Text>
                  </View>
                  <TouchableOpacity style={styles.seeMore} onPress={() => this.props.navigation.navigate('PlanetDetail', { name : item.name , ID:item.id})}>
                    <Text style={styles.seeMoreTxt}>See More</Text>
                  </TouchableOpacity>
                </View>
                {/* <Spinner/> */}
              </View>
              //   )
              // })}
            }
            // keyExtractor={item => item.id.toString()}
          />}
      {this.state.loader==true && <Spinner color='purple'/>}

        </ScrollView>

        <Footer />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bigTxt: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  searchBarMain: {
    width: "90%",
    height: 50,
    padding: 15,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center'
  }, searchBar: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'lightgrey'
  },
  seeMore: {
    backgroundColor: defaultColor,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  seeMoreTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white'
  }
});
