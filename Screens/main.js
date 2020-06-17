import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity, Platform, Linking} from 'react-native';
import {Button,Card} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {getWorldData}  from '../API/Server';
import axios from 'axios';
import { round } from 'react-native-reanimated';

const MainScreen=({route,navigation})=>{
    //console.log(route.params);


    const [APIWorldData,setAPIWorldData] = useState({confirmed:'',deaths:'',recovered:'' });
    const [HomeData,setHomeData] = useState({confirmed:'',deaths:'',recovered:'', title:'' });
    const [WorldCountries, setWorldCountries] = useState([]);
    const [WorldLoading, setWorldLoading] = useState(false);

    useEffect(()=>{
        if(route.params?.Switch1Val)
          {
              console.log(route.params.StateAPICountryData.confirmed); 
              //console.log(route.params.selectedCountry); 
              setHomeData({confirmed: route.params.StateAPICountryData.confirmed, deaths: route.params.StateAPICountryData.deaths, recovered: route.params.StateAPICountryData.recovered,title: route.params.selectedCountry})
        }

        if(route.params?.Switch2Val)
          {
              console.log(route.params.StateAPIdata); 
              setHomeData({confirmed: route.params.StateAPIdata.confirmed, deaths: route.params.StateAPIdata.deaths, recovered: route.params.StateAPIdata.recovered, title: route.params.StateAPIdata.name})
        }
        
 },[route.params?.Switch1Val,route.params?.Switch2Val]);



    useEffect(()=>{
        console.log('inside');
     
        getWorldData((data) => {
            setAPIWorldData({confirmed: data.confirmed.value, deaths: data.deaths.value, recovered: data.recovered.value});
              
                 });


    },[]);

 
    MakeCall=()=>{
            let phonenumber = '';
            if(Platform.OS === 'android'){
                phonenumber = `tel:${6167065373}`;
            }
            else{
                phonenumber = `telprompt:${6167065373}`
            }

            Linking.openURL(phonenumber);

    };

    return (
        <View style={styles.container}>
          <View>
            <Card style={styles.view1} title='Precautions'>
                <Text style={{fontSize:16,alignSelf :"center"}}>KEEP a safe distance</Text>
                <Text style={{fontSize:16,alignSelf :"center"}}>WASH hands often</Text>
                <Text style={{fontSize:16, alignSelf :"center"}}>COVER your cough</Text>
                <Text style={{fontSize:20, alignSelf :"center"}}>Sick ? Call ahead </Text>
                  <View style={{alignItems:"center"}}>
                  <TouchableOpacity title='Call' 
                    onPress={()=>{MakeCall()}} 
                    style={{ backgroundColor:'#10e649', width:200, height:40, borderRadius:40}}
                  >
                      <Feather style={{alignSelf:"center", marginTop:7}} name="phone-call" size={28} color="white" />
                </TouchableOpacity>
                </View>
   
                
            </Card>
            </View>
            <View style={styles.StatisticsButton}> 

        <View style={{flexDirection:"row", flex:1, justifyContent:"space-around"}}>   
        
                  <TouchableOpacity title='Statistics' 
                    onPress={()=>{navigation.navigate('Visuals')}} 
                    style={{ backgroundColor:'#07a0a8', width:150, height:40, borderRadius:40}}
                  >
                      <Text style={{alignSelf:"center", marginTop:6, fontSize:18, color:'yellow'}}>Statistics</Text>
            </TouchableOpacity>

            <TouchableOpacity title='Maps' 
                    onPress={()=>{navigation.navigate('Maps')}} 
                    style={{ backgroundColor:'#07a0a8', width:150, height:40, borderRadius:40}}
                  >
                      
            <Text style={{alignSelf:"center", marginTop:6, fontSize:18, color:'yellow'}}>Map View</Text>
            </TouchableOpacity>
                </View>
          

            </View>

            <View style={{marginTop:35}}>
            <Card style={styles.view2} title='World Statistics'>
            <Text style={{fontSize:15, color:'#1090e6', alignSelf :"center"}}>Confirmed Cases: {APIWorldData.confirmed}</Text>
                  <Text style={{fontSize:15, color:'red', alignSelf :"center"}}>Total Deaths: {APIWorldData.deaths}</Text>
                  <Text style={{fontSize:15,color:'#0df005', alignSelf :"center"}}>Recovered: {APIWorldData.recovered}</Text>
            </Card>
                <Card  title={<Text style={{fontSize:20, alignSelf:'center'}}>{HomeData.title}</Text>}>
                  <Text style={{fontSize:15,color:'#1090e6',alignSelf :"center"}}>Confirmed Cases: {HomeData.confirmed}</Text>
                  <Text style={{fontSize:15, alignSelf :"center", color:'red'}}>Total Deaths: {HomeData.deaths}</Text>
                  <Text style={{fontSize:15, alignSelf :"center", color:'#0df005'}}>Recovered: {HomeData.recovered}</Text>
            </Card>
            </View>
            </View>


    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#87c4cc',
        flex:1,
        textAlign:"center",
        
        
      },

     view1:{
        backgroundColor:'blue',
        height:250,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        
        

     } ,

     view2:{
        backgroundColor:'green',
        height:250,
        marginLeft:10,
        marginRight:10,
        marginTop:10,

     },
     
     StatisticsButton:{
        marginTop:10,
        marginRight:10,
        marginLeft:10,



     },


});

export default MainScreen;