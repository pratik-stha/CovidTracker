import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity,FlatList,listite} from 'react-native';
import {Button,Card,SearchBar,ListItem} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {getData}  from '../API/Server';
import axios from 'axios';
import RNPicker from 'rn-modal-picker';


const dat = {
    dataSource: [
      {
        id: 1,
        name: "Afghanistan"
      },
      {
        id: 2,
        name: "Bahrain"
      },
      {
        id: 3,
        name: "Canada"
      },
      {
        id: 4,
        name: "Denmark"
      },
      {
        id: 5,
        name: "Egypt"
      },
      {
        id: 6,
        name: "France"
      },
      {
        id: 7,
        name: "Greece"
      },
      {
        id: 8,
        name: "Hong Kong"
      },
      {
        id: 9,
        name: "India"
      },
      {
        id: 10,
        name: "Japan"
      },
      {
        id: 11,
        name: "Kenya"
      },
      {
        id: 12,
        name: "Liberia"
      }
    ],
    placeHolderText: "Please Select Country",
    selectedText: ""
  };
const VisualScreen=({route,navigation})=>{

    const [search,setsearch] = useState(''); 
    
    const [APIdata,setAPIdata] = useState({confirmed:'',deaths:'',recovered:'' });
    const [state,setState] = useState({ loading: false, data: [], temp: [], error: null, search: null})
    
    useEffect(()=>{
        console.log('inside');
     
        getData((data) => {
            setAPIdata({confirmed: data.confirmed.value, deaths: data.deaths.value, recovered: data.recovered.value});
              
                 });

    getJson();


    },[route.params]);
   
    const setResult = (json) => {
          setState({
          data: [...state.data, ...json],
          temp: [...state.temp, ...json],
          error: json.error || null,
          loading: false
        });
      }
 
   const  updateSearch = search => {
        setState({ search }, () => {
            if ('' == search) {
                setState({
                    data: [...state.temp]
                });
                return;
            }
             
            state.data = state.temp.filter(function(item){
                return item.name.includes(search);
              }).map(function({id, name, email}){
                return {id, name, email};
            });
        });
};

const renderHeader = () => {
    return <SearchBar placeholder="Search Here..."
        lightTheme round editable={true}
        value={state.search}
        onChangeText={updateSearch} />; 
}; 


  const getJson = async()  => {
        const url = `https://jsonplaceholder.typicode.com/users`;
        setState({ Loading: true });
          
         try {
            const response = await fetch(url);
            const json = await response.json();
            setResult(json);
         } catch (e) {
            setState({ error: 'Error Loading content', loading: false });
         }
      };

    return (
        
            
       
        <View>
              <Card style={styles.Card1} title= 'Covid 19 Status'>
                  <Text style={{fontSize:20}}>Confirmed Cases: {APIdata.confirmed}</Text>
                  <Text style={{fontSize:20}}>Total Deaths: {APIdata.deaths}</Text>
                  <Text style={{fontSize:20}}>Recovered: {APIdata.recovered}</Text>

              </Card>

              <FlatList
            ListHeaderComponent={renderHeader}
            data={state.data}
            keyExtractor={item => item.email}
            renderItem={({ item }) => (
            <ListItem
                roundAvatar
                title={`${item.name}`}
                subtitle={item.email}
            />
        )}
      />
                    
        </View>


    );
}

const styles = StyleSheet.create({

    Heading:{
        fontSize:35,
        alignSelf:"center",
    },

    Card1:{
    
        height:50,
        
        

    }
}
) ;

export default VisualScreen;