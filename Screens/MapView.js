import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity, Platform, Linking, Dimensions} from 'react-native';
import {Button,Card} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {getWorldData}  from '../API/Server';
import axios from 'axios';
import { round } from 'react-native-reanimated';
import MapView, {Marker} from 'react-native-maps';

const data = [{"location": "Rhode Island", "country_code": "us", "latitude": 41.5800945, "longitude": -71.4774291, "confirmed": 15947, "dead": 509, "recovered": null, "updated": "2020-06-16 03:30:37.087474+00:00"},
                {"location": "Northwest Territories", "country_code": "ca", "latitude": 64.8255441, "longitude": -124.8457334, "confirmed": 5, "dead": 0, "recovered": null, "updated": "2020-06-15 00:00:00+00:00"}];

const MapScreen=({route,navigation})=>{

console.log(data);

const MapMarkers = () => {
    
    return data.map((report) => (
        <Marker coordinate = {{latitude: report.latitude,longitude: report.longitude}}
        pinColor = {"purple"} // any color
        title={"CA"}
               description={`${report.confirmed}`}/>

    ))
  }

/* const MapMarkers = () => {
    return data.map((report) => <Marker
    pinColor={"purple"} 
    coordinate={{ latitude: report.latitude, longitude: report.longitude }}
      title={report.location}
      description={''}
    >
    </Marker >)
  } */
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