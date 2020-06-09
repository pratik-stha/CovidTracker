import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import {Button,Card} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

const MainScreen=({route,navigation})=>{
 
   

    return (
        <View style={styles.container}>
           
            <Card style={styles.view1} title='Precautions'>

            </Card>

            <View style={styles.StatisticsButton}> 
            <Button
          title="STATISTICS"
          onPress={()=>navigation.navigate('Visuals')}
        />
            </View>
            <Card style={styles.view2} title='statistics'>

            </Card>
           
            </View>


    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        
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