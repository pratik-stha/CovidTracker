import React,{useState,useEffect} from 'react';
import { Text, View, FlatList, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, SearchBar,Input } from 'react-native-elements';
import {getStateData, getStateName} from '../API/CountyLevel';
import {USstateList} from '../StateNameList';

const Tab = createMaterialTopTabNavigator();

const TryPage=()=> {
   const [StateAPIdata,setStateAPIdata] = useState({confirmed:'',deaths:'',recovered:'' });
    
    const [stateName, setstateName] = useState('mi');

   const stateList = [];
   const [searchVal,setsearchVal] = useState('');
 
   const [searchState,setsearchState] = useState({isloading:true, searchList:'', inMemory:''});

    useEffect(()=>{
        getStateData(stateName,(data) => {
            setStateAPIdata({confirmed: data.positive, death: data.death, recovered: data.recovered});
           // console.log(data.death);
           for (var i=0;i<USstateList.length;i++){
              stateList[i]=USstateList[i].name;
              stateListAbb[i]=USstateList[i].abbreviation;
            
           }
     
        });


    },[]);
   
    
function HomeScreen() {
    return (
      <View >
        <Text>Home!</Text>
        <Card title='Countries' ></Card>
      </View>
    );
  }

 const renderFlatList = ({ item }) => (
    <View style={{ minHeight: 70, padding: 5 }}>
      <Text style={{fontWeight: 'bold', fontSize: 26 }}>
        {item.name}
      </Text>
     
    </View>
  );

  
  const searchContacts = value => {
    const filteredContacts = USstateList.filter(contact => {
      let contactLowercase = (contact.name).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setsearchState({ searchList: filteredContacts });
  };


  function SettingsScreen() {

    return (
      <View>
        <Text>Settings!</Text>
        <View>
        <SearchBar
            placeholder = 'search state'
            onChangeText={(val)=>{searchContacts(val);setsearchVal(val);}}
            value={searchVal}
        
        />
        
        <FlatList
        data={searchState.searchList}
        renderItem = {renderFlatList}
        keyExtractor={(item,index) => index.toString()}
        ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50
              }}
            >
              <Text style={{ color: '#bad555' }}>No Match Found</Text>
            </View>
          )}
      />

      </View>
        <View>
        <Card title='State'>
           
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
