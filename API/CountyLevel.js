import axios from 'axios';



const ServA = axios.create({
    baseURL: 'https://covidtracking.com/api/v1/states',

});


ServA.interceptors.request.use(
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
  
  export const getStateData = async (stateName,callback) => {
    const response = await ServA.get(`/${stateName}/current.json`)
    //console.log(response);
    callback(response.data);
  };

  export const getStateName = async (callback) => {
    const response = await ServA.get(`/current.json`)
    //console.log(response);
    callback(response.data);
  };
  
  
 