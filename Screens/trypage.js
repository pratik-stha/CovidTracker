import React,{useState,useEffect} from 'react';
import { Text, View, FlatList,StyleSheet,Dimensions, TextInput,Switch,TouchableOpacity, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, SearchBar,Input } from 'react-native-elements';
import {getStateData, getStateName} from '../API/CountyLevel';
import {USstateList} from '../StateNameList';
import { TouchableHighlight, State } from 'react-native-gesture-handler';
import {getData,getCountries} from '../API/Server';
import {countryNameList} from '../countryNameList';
import {initSearchHistoryDB,storeSearchItem,setupDataListener } from '../Helper/fb-helper';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


  
const Tab = createMaterialTopTabNavigator();

const VisualScreen=({route,navigation})=> {
   const [StateAPIdata,setStateAPIdata] = useState({confirmed:'',deaths:'',recovered:'',name:'' });
   const [StateAPICountryData,setStateAPICountryData] = useState({confirmed:'',deaths:'',recovered:'',name:'' });
   
   const [Switch1Val,setSwitch1Val] = useState(false);
    const [Switch2Val,setSwitch2Val] = useState(false);
   
    const [stateName, setstateName] = useState();

   const [countryName,setcountryName] = useState('USA');
   const [searchVal,setsearchVal] = useState({label:'',abbreviation:''});
 
   const [searchState,setsearchState] = useState({isloading:true, searchList:''});
   const [countryList,setcountryList] = useState({label:''});
   const [selectedCountry,setSelectedCountry] = useState();
   const [PassData,setPassData] = useState({data:'',title:''});

   useEffect(()=>{
    try{
        initSearchHistoryDB();
    }catch(err){
        console.log(err);
    }

},[]);

useEffect(()=>{
  if(searchVal){
    getStateData(searchVal.abbreviation,(data)=>
        setStateAPIdata({confirmed:data.positive, deaths: data.death , recovered: data.recovered,name:searchVal.label}))
  }
},[searchVal]);

   useEffect(()=>{
       
        getData(selectedCountry,(data)=>
        setStateAPICountryData({confirmed: data.confirmed.value, deaths: data.deaths.value, recovered: data.recovered.value, name:selectedCountry}));
        
   },[selectedCountry]);

   useEffect(()=>{
        if(StateAPICountryData.confirmed !=='' && StateAPICountryData.deaths !=='' && StateAPICountryData.recovered !== '')     {            
      Object.assign(StateAPICountryData);

       storeSearchItem({Confirmed:StateAPICountryData.confirmed,Recovered: StateAPICountryData.recovered,Deaths:StateAPICountryData.recovered,name:StateAPICountryData.name})
        }
},[StateAPICountryData]);



useEffect(()=>{
   if(Switch1Val){
       setSwitch2Val(false);
   }
    
},[Switch1Val]);


useEffect(()=>{

    if(Switch2Val){
        setSwitch1Val(false);
    }
 
    
 },[Switch2Val]);
 

 
useEffect(()=>{
    if(StateAPIdata.confirmed !=='' && StateAPIdata.deaths !=='' && StateAPIdata.recovered !== '')     {            
  Object.assign(StateAPIdata);

   storeSearchItem({Confirmed:StateAPIdata.confirmed,Recovered: StateAPIdata.recovered,Deaths:StateAPIdata.recovered,name:StateAPIdata.name})
    }
},[StateAPIdata]);


navigation.setOptions(
    {
        
        headerLeft:()=>(
            <TouchableOpacity onPress={()=>navigation.navigate('Main',{StateAPICountryData,selectedCountry,Switch1Val,StateAPIdata,stateName, Switch2Val})}>
            <AntDesign style={{marginLeft:15}} name="back" size={34} color="black" />
           </TouchableOpacity>
        ),

        headerRight:()=>(
            <TouchableOpacity onPress={()=>navigation.navigate('History')}>
            <FontAwesome5 style={{marginRight:15}} name="history" size={24} color="black" />
           </TouchableOpacity>
        ),

    }
);


function HomeScreen() {
    return (
      <View style={styles.container}>
             <Card title= {<Text style={{ color:'#32a69a', fontSize:25, alignSelf:"center", textDecorationLine:"underline"}}>{selectedCountry} </Text>}>
            <Text style={{fontSize:20, color:'blue'}}>Confirmed Cases: {StateAPICountryData.confirmed}</Text>
                  <Text style={{fontSize:20, color:'red'}}>Total Deaths: {StateAPICountryData.deaths}</Text>
                  <Text style={{fontSize:20, color:'#0df005'}}>Recovered: {StateAPICountryData.recovered}</Text>
                 <View style={{flexDirection:"row"}}>
                   <Text style={{marginTop:10, fontSize:15, color:'#7d9396'}}>Pin to Home Screen</Text>
                   <Switch
                   style={{marginLeft:105, marginTop:7}}
                        onValueChange = {(val)=>setSwitch1Val(val)}
                        value = {Switch1Val}/>
                 </View>
                  
            </Card>
         <DropDownPicker
                    items={countryNameList}
                    defaultNull
                    placeholder="Select your country"
                    containerStyle={{height: 50}}
                    onChangeItem={item =>{setSelectedCountry(item.label);
                                       
                   }}
               />
               </View>
    
    );
  }


 
 //   console.log("The statename is: ",stateName);
  function SettingsScreen() {

    return (
      <View style={styles.container}>
   
        
      
        <View>
        <Card title={<Text style={{color:'#32a69a', fontSize:25, alignSelf:"center", textDecorationLine:"underline"}}>{searchVal.label}</Text>}>
           
        <Text style={{fontSize:20, color:'blue'}}>Confirmed Cases: {StateAPIdata.confirmed}</Text>
        <Text style={{fontSize:20,color:'red'}}>Death: {StateAPIdata.deaths}</Text>
        <Text style={{fontSize:20, color:'#0df005'}}>Recovered: {StateAPIdata.recovered}</Text>
        <View style={{flexDirection:"row"}}>
        <Text style={{marginTop:10, fontSize:15, color:'#7d9396'}}>Pin to Home Screen</Text>
        <Switch
            style={{marginLeft:105, marginTop:7}}
            onValueChange = {(val)=>setSwitch2Val(val)}
            value = {Switch2Val}/>
            </View>
       
        </Card>
        </View>
      
        <DropDownPicker
                    items={ USstateList}
                    defaultNull
                    placeholder="Select the State"
                    containerStyle={{height: 50}}
                    onChangeItem={item =>{setsearchVal({label:item.label, abbreviation:item.abbreviation.toLowerCase()});
                                         setstateName(item.label);
                                       
                   }}
               />
                <View style={styles.container}>

                   

                    </View>
      </View>

      
    );
  }

  
  return (

      <Tab.Navigator tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#3b8a88',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#e6f238',
          borderBottomWidth: 2,
        },
      }}>
        <Tab.Screen name="World" component={HomeScreen}  />
        <Tab.Screen name="USA" component={SettingsScreen} />
      </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#87c4cc',
    flex:1,
    textAlign:"center",
    
  },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  

export default VisualScreen;
