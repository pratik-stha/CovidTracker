import React,{useState,useEffect} from 'react';
import { Text, View, FlatList, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, SearchBar,Input } from 'react-native-elements';
import {getStateData, getStateName} from '../API/CountyLevel';
import {USstateList} from '../StateNameList';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

const TryPage=()=> {
   const [StateAPIdata,setStateAPIdata] = useState({confirmed:'',deaths:'',recovered:'' });
    
    const [stateName, setstateName] = useState('mi');

   const stateList = [];
   const [searchVal,setsearchVal] = useState('');
 
   const [searchState,setsearchState] = useState({isloading:true, searchList:''});

   
   

useEffect(()=>{
    searchContacts(searchVal);
    console.log(searchVal);
},[searchVal]);


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


function HomeScreen() {
    return (
      <View >
        <Text>Home!</Text>
        <Card title='Countries' ></Card>
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
            onChangeText={(val)=>{setsearchVal(val)   }}
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
