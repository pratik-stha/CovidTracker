import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity,FlatList,listite} from 'react-native';
import {Button,Card,SearchBar,ListItem,Avatar} from 'react-native-elements';
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

    
    
    const [APIdata,setAPIdata] = useState({confirmed:'',deaths:'',recovered:'' });
    
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('');
    const [filteredCountryList, setFilteredCountryList] = useState(countryList);


    useEffect(() => {
      const lowerCaseQuery = query.toLowerCase();
      const newCountries = countryList
        .filter((country) => country.lowerCaseName.includes(lowerCaseQuery))
        .map((country) => ({
          ...country,
          rank: country.lowerCaseName.indexOf(lowerCaseQuery),
        }))
        .sort((a, b) => a.rank - b.rank);
    
      setFilteredCountryList(newCountries);
    }, [query]);

    useEffect(()=>{
        console.log('inside');
     
        getData((data) => {
            setAPIdata({confirmed: data.confirmed.value, deaths: data.deaths.value, recovered: data.recovered.value});
              
                 });


    },[route.params]);
   
    useEffect(() => {
      setLoading(true);
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(res => {
          setCountries(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);
  

    if (loading) {
      return <Text>Loading countries...</Text>;
    }
    
    
   

    function RenderFlatlist({item}){
      return(
      <Text>{item.name}</Text>
      );
    };


    const countryList = Object.values(countries)
          .map((country) => ({
            ...country,
            lowerCaseName: country.name.toLowerCase(),
          }))
          .sort((a, b) => a.name > b.name);

    return (
        <View>
              <Card style={styles.Card1} title= 'Covid 19 Status'>
                  <Text style={{fontSize:20}}>Confirmed Cases: {APIdata.confirmed}</Text>
                  <Text style={{fontSize:20}}>Total Deaths: {APIdata.deaths}</Text>
                  <Text style={{fontSize:20}}>Recovered: {APIdata.recovered}</Text>

              </Card>
              <SearchBar
                  placeholder="Search your countries..."
                  onChangeText={setQuery}
                  value={query}
                />
                <FlatList
                  keyExtractor={(item, index) => `${index}`}
                  data={filteredCountryList}
                  renderItem={RenderFlatlist}
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