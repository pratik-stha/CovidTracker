import React,{useState,useEffect} from 'react';
import { Text, View, FlatList, TextInput,Switch,TouchableOpacity, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, SearchBar,Input } from 'react-native-elements';
import {getStateData, getStateName} from '../API/CountyLevel';
import {USstateList} from '../StateNameList';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {getData,getCountries} from '../API/Server';
import {countryNameList} from '../countryNameList';
import {initSearchHistoryDB,storeSearchItem,setupDataListener } from '../Helper/fb-helper';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';


const Tab = createMaterialTopTabNavigator();

const TryPage=({route,navigation})=> {
   const [StateAPIdata,setStateAPIdata] = useState({confirmed:'',deaths:'',recovered:'' });
   const [StateAPICountryData,setStateAPICountryData] = useState({confirmed:'',deaths:'',recovered:'',name:'' });
   
   const [Switch1Val,setSwitch1Val] = useState(false);
    const [Switch2Val,setSwitch2Val] = useState(false);
   
    const [stateName, setstateName] = useState('mi');

   const [countryName,setcountryName] = useState('USA');
   const [searchVal,setsearchVal] = useState('');
 
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
       
        getData(selectedCountry,(data)=>
        setStateAPICountryData({confirmed: data.confirmed.value, deaths: data.deaths.value, recovered: data.recovered.value, name:selectedCountry}));
        
   },[selectedCountry]);

   useEffect(()=>{
        if(StateAPICountryData.confirmed !=='' && StateAPICountryData !=='' && StateAPICountryData !== '')     {            
      Object.assign(StateAPICountryData);

       storeSearchItem({StateAPICountryData})
        }
},[StateAPICountryData]);

 
useEffect(()=>{
    if(check_validation(searchVal)){
       
        getStateData(stateName,(data) => {

     setStateAPIdata({confirmed: data.positive, death: data.death, recovered: data.recovered});
  

        });}

 else{
     console.log('searchval: ',searchVal);
     setStateAPIdata({confirmed: 'INVALID', death: 'INVALID', recovered: 'INVALID'});

 }
},[searchVal]);

useEffect(()=>{
   if(Switch1Val){
       setSwitch2Val(false);
   }
   if(Switch2Val){
       setSwitch1Val(false);
   }

   
},[Switch1Val]);

navigation.setOptions(
    {
        
        headerLeft:()=>(
            <TouchableOpacity onPress={()=>navigation.navigate('Main',{StateAPICountryData,selectedCountry,Switch1Val,StateAPIdata,searchVal ,Switch2Val})}>
            <AntDesign name="back" size={34} color="black" />
           </TouchableOpacity>
        ),

    }
);


function HomeScreen() {
    return (
      <View >
             <Card title= {<Text>{selectedCountry} </Text>}>
            <Text style={{fontSize:20}}>Confirmed Cases: {StateAPICountryData.confirmed}</Text>
                  <Text style={{fontSize:20}}>Total Deaths: {StateAPICountryData.deaths}</Text>
                  <Text style={{fontSize:20}}>Recovered: {StateAPICountryData.recovered}</Text>
                 
                  <Switch
                        onValueChange = {(val)=>setSwitch1Val(val)}
                        value = {Switch1Val}/>
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

 
  const searchContacts = value => {
    const filteredContacts = USstateList.filter(contact => {
      let contactLowercase = (contact.name).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setsearchState({ searchList: filteredContacts });
  };


  const renderFlatList = ({ item }) => (
    <View style={{ minHeight: 70, padding: 5 }}>
        <TouchableHighlight onPress={()=>{setsearchVal(item.name);
                                        setstateName(item.abbreviation.toLowerCase());
                                        setsearchState({searchList:''})
                            }}> 
        <Text style={{fontWeight: 'bold', fontSize: 16 }}> {item.name} </Text>
      </TouchableHighlight>

     
    </View>
  );

  
 function check_validation(val){
    var flag = false;
    for(let i=0;i<USstateList.length;i++){
            if(USstateList[i].name === val)
             {
                 console.log(USstateList[i]);
                 flag = true;
                 break;
          
             }
             else{
                 flag = false;
             }
 }
  return flag;
 };


 //   console.log("The statename is: ",stateName);
  function SettingsScreen() {

    return (
      <View>
   
        <SearchBar
            placeholder = 'Search by State Name'
            onChangeText={(val)=>{setsearchVal(val);searchContacts(val);   }}
            value={searchVal}
        
        />
        
        <FlatList
        data={searchState.searchList}
        renderItem = {renderFlatList}
        keyExtractor={(item,index) => index.toString()}
        
      />

      
        <View>
        <Card title={<Text style={{color:'blue'}}>{searchVal}</Text>}>
           
        <Text style={{fontSize:20}}>Confirmed Cases: {StateAPIdata.confirmed}</Text>
        <Text style={{fontSize:20}}>Death: {StateAPIdata.death}</Text>
        <Text style={{fontSize:20}}>Recovered: {StateAPIdata.recovered}</Text>
        
        <Switch
            onValueChange = {(val)=>setSwitch2Val(val)}
            value = {Switch2Val}/>
       
        </Card>
        </View>
      </View>
    );
  }

  
  return (

      <Tab.Navigator>
        <Tab.Screen name="World" component={HomeScreen} />
        <Tab.Screen name="USA" component={SettingsScreen} />
      </Tab.Navigator>

  );
}

export default TryPage;
