import React,{useState,useEffect} from 'react';
import { Text, View, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, SearchBar } from 'react-native-elements';
import {getStateData, getStateName} from '../API/CountyLevel';
import {USstateList} from '../StateNameList';

const Tab = createMaterialTopTabNavigator();

const TryPage=()=> {
   const [StateAPIdata,setStateAPIdata] = useState({confirmed:'',deaths:'',recovered:'' });
    
    const [stateName, setstateName] = useState('mi');

   const stateList = [];

   const [searchState,setsearchState] = useState({isloading:true, search:'', dataSource:USstateList});

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
  
 function SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = USstateList.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setsearchState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search:text,
    });
  }

  function SettingsScreen() {
    return (
      <View>
        <Text>Settings!</Text>
        <View>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(val) => setsearchState({search:`${val}`})}
          onClear={text => SearchFilterFunction('')}
          placeholder="Type Here..."
          value={searchState.search}
          />
           <FlatList
        data={USstateList}
        renderItem={({ item }) => <Text>{item.name} </Text>}
        keyExtractor={(item,index) => item.abbreviation}
      />
      </View>
        
        <Card title='State'>
           
        <Text style={{fontSize:20}}>Confirmed Cases: {StateAPIdata.confirmed}</Text>
        <Text style={{fontSize:20}}>Death: {StateAPIdata.death}</Text>
        <Text style={{fontSize:20}}>Recovered: {StateAPIdata.recovered}</Text>
       
        </Card>
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
