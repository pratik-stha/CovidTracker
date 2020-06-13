import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity,FlatList,listite} from 'react-native';
import {Button,Card,SearchBar,ListItem,Avatar} from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {getData}  from '../API/Server';
import axios from 'axios';
import RNPicker from 'rn-modal-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';


const VisualScreen=({route,navigation})=>{

    //var nam = 'Nepal';
    
    const [APIdata,setAPIdata] = useState({confirmed:'',deaths:'',recovered:'' });
    
        
    const [APIcountries, setAPICountries] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('');
    const [filteredCountryList, setFilteredCountryList] = useState(countryList);
    const [countryName, setCountryName] = useState('Nepal');


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
        getData(countryName,(data) => {
            setAPIdata({confirmed: data.confirmed.value, deaths: data.deaths.value, recovered: data.recovered.value});
      });
    },[query]);
   
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
  
    useEffect(() => {

      axios
        .get("https://covid19.mathdro.id/api/countries/")
        .then(res => {
          setAPICountries(res);

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
        <TouchableHighlight 
          onPress={()=>{setCountryName(item.name);
            setQuery(item.name);
            navigation.navigate('Visuals');
          }
          
          }>   
         <View style={{height: 50}}>
      <Text >{item.name}</Text>
        </View>
        </TouchableHighlight>

      );
    };


     const countryList = Object.values(countries)
          .map((country) => ({
            ...country,
            lowerCaseName: country.name.toLowerCase(),
          }))
          .sort((a, b) => a.name > b.name); 
        
        
          function Item({ title }) {
            console.log(title);
            return (
              <View>
                <Text>{title}</Text>
              </View>
            );
          }
    return (
        <View>
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
              <Card style={styles.Card1} title={countryName}>
                  <Text style={{fontSize:20}}>Confirmed Cases: {APIdata.confirmed}</Text>
                  <Text style={{fontSize:20}}>Total Deaths: {APIdata.deaths}</Text>
                  <Text style={{fontSize:20}}>Recovered: {APIdata.recovered}</Text>

              </Card>
              <Card>
                  <FlatList 
                      keyExtractor={(item,index) => item.name}
                      data={APIdata}
                       renderItem={({ item }) => <Item title={item} />}
                  />


              </Card>
              
 
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