import axios from 'axios';



const Serv = axios.create({
    baseURL: 'https://covid19.mathdro.id/api',

});


Serv.interceptors.request.use(
    async (config) => {
      // called when request is made.
      config.headers.Accept = 'application/json';
      // const token = await AsyncStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (err) => {
      // called when error
      return Promise.reject(err);
    }
  );
  
  export const getData = async (country,callback) => {
    const response = await Serv.get(`/countries/${country}`)
    //console.log(response);
    callback(response.data);
  };
  
 