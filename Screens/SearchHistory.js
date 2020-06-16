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
                <AntDesign style={{marginRight:15}} name="delete" size={24} color="black" />
               </TouchableOpacity>
            ),
    
        }
    );


    const Item=({index,item})=> {
        console.log("The output is: ",item);
        return (

            <TouchableHighlight style={{borderRadius:25}} underlayColor='#28b0ed'>
                   <View style={styles.item}>
        <Text style={{fontSize:20, textAlign:'center'}}> {item.name}</Text>
                   <Text style={{ fontSize:15}}> Confirmed:{item.Confirmed}</Text>
                    <Text style={{fontSize:15}}> Deaths:{item.Deaths}</Text>
                    <Text style={{fontSize:15}}> Recovered: {item.Recovered}</Text>
                    </View>
            </TouchableHighlight>
        )
        }

    return(
<SafeAreaView >
           <FlatList
            data={DataArr}
            renderItem={Item}
            keyExtractor={item =>item.id}
                />
 </SafeAreaView>
)};



const styles = StyleSheet.create({});

export default HistoryScreen;

