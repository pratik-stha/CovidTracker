import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity, Platform, Linking} from 'react-native';
import {Button,Card} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {getWorldData}  from '../API/Server';
import axios from 'axios';

const MainScreen=({route,navigation})=>{
    
    const [APIWorldData,setAPIWorldData] = useState({confirmed:'',deaths:'',recovered:'' });
    const [WorldCountries, setWorldCountries] = useState([]);
    const [WorldLoading, setWorldLoading] = useState(false);

    useEffect(()=>{
        console.log('inside');
     
        getWorldData((data) => {
            setAPIWorldData({confirmed: data.confirmed.value, deaths: data.deaths.value, recovered: data.recovered.value});
              
                 });


    },[route.params]);

    MakeCall=()=>{
            let phonenumber = '';
            if(Platform.OS === 'android'){
                phonenumber = `tel:${6165709312}`;
            }
            else{
                phonenumber = `telprompt:${6165709312}`
            }

            Linking.openURL(phonenumber);

    };

    return (
        <View style={styles.container}>
          
            <Card style={styles.view1} title='Precautions'>
            <Button title='Call' 
                    onPress={()=>{MakeCall()}}/>
            </Card>

            <View style={styles.StatisticsButton}> 
            <Button
          title="STATISTICS"
          onPress={()=>navigation.navigate('Visuals')}
        />
          <Button
          title="TRY"
          onPress={()=>navigation.navigate('Try')}
        />
            </View>
            <Card style={styles.view2} title='World Statistics'>
            <Text style={{fontSize:20}}>Confirmed Cases: {APIWorldData.confirmed}</Text>
                  <Text style={{fontSize:20}}>Total Deaths: {APIWorldData.deaths}</Text>
                  <Text style={{fontSize:20}}>Recovered: {APIWorldData.recovered}</Text>

            </Card>
           
            </View>


    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        flex:1,
        
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