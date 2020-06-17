import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity, Platform, Linking, Dimensions} from 'react-native';
import {Button,Card} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {getWorldData}  from '../API/Server';
import axios from 'axios';
import { round } from 'react-native-reanimated';
import MapView, {Marker} from 'react-native-maps';
import {getMapData} from '../API/MapServer';
import {Mapdata} from '../MapDatas';



 const Mapdata1 = [{"location": "Montana", "country_code": "us", "latitude": 46.8796822, "longitude": -110.3625658, "confirmed": 624, "dead": 19,
 "recovered": null, "updated": "2020-06-17 21:15:31.317274+00:00"}, 
 {"location": "Rhode Island", "country_code": "us", "latitude": 41.5800945, 
 "longitude": -71.4774291, "confirmed": 16164, "dead": 509, "recovered": null, "updated": "2020-06-17 21:15:31.317274+00:00"},
  {"location": "Goa", 
 "country_code": "in", "latitude": 15.2993265, "longitude": 74.12399599999999, "confirmed": 629, "dead": 0, "recovered": 85,
  "updated": "2020-06-17 21:18:49.555017+00:00"}]


 
const MapScreen=({route,navigation})=>{
  
const [mapval,setmapval] = useState();  

 useEffect(()=>{

        getMapData((dat)=>setmapval(dat.data));

},[])
 
const MapMarkers = () => {
    
    
     return Mapdata.map((report) => (
        <Marker coordinate = {{latitude: report.latitude, longitude: report.longitude}}
        pinColor = {"purple"} // any color
        title={report.location}
         description={`cases: ${report.confirmed}`}/>

    )) 
  }


return(
    <View style={styles.container}>

       
		
    <MapView style={styles.mapStyle} >
    <View>
<MapMarkers/>
  </View>
    </MapView>

</View>


);

}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  
  
export default MapScreen;