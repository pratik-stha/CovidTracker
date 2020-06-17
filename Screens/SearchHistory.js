import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity, Platform, Linking, FlatList, SafeAreaView, TouchableHighlight} from 'react-native';
import {Button,Card} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {setupHistoryListener, deleteAll } from '../Helper/fb-helper';
import { color } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';


const HistoryScreen=({route,navigation})=>{
    const [DataArr,setDataArr] = useState([]);


    useEffect(()=>{
     
        setupHistoryListener((items)=>{setDataArr(items)});

    },[]);

    navigation.setOptions(
        {
                headerRight:()=>(
                <TouchableOpacity onPress={()=> deleteAll()}>
                <AntDesign style={{marginRight:19}} name="delete" size={29} color="#dceba0" />
               </TouchableOpacity>
            ),

            headerLeft:()=>(
                <TouchableOpacity onPress={()=>navigation.navigate('Visuals')}>
                <AntDesign style={{marginLeft:15}} name="back" size={39} color="#dceba0" />
               </TouchableOpacity>
            ),
    
        }
    );


    const Item=({index,item})=> {
        console.log("The output is: ",item);
        return (

            <TouchableHighlight style={styles.item} underlayColor='#28b0ed'>
                   <View style={{alignSelf:"center"}}>
        <Text style={{fontSize:20, textAlign:'center', color:'yellow'}}> {item.name}</Text>
                   <Text style={{ fontSize:15, color:'white'}}> Confirmed:{item.Confirmed}</Text>
                    <Text style={{fontSize:15, color:'white'}}> Deaths:{item.Deaths}</Text>
                    <Text style={{fontSize:15, color:'white'}}> Recovered: {item.Recovered}</Text>
                    </View>
            </TouchableHighlight>
        )
        }

    return(
<SafeAreaView style={styles.container}>
    
           <FlatList
            data={DataArr}
            renderItem={Item}
            keyExtractor={item =>item.id}
                />

 </SafeAreaView>
)};



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#87c4cc',
        flex:1,
        textAlign:"center",
        
      },
      
    item: {
        backgroundColor: '#3084ab',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 25,
      },
});

export default HistoryScreen;

