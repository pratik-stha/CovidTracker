import axios from 'axios';



const ServA = axios.create({
    baseURL: 'https://postman-data-api-templates.github.io/county-health-departments/api/colorado.json',

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
  
  export const getDataA = async (callback) => {
    const response = await ServA.get()
    //console.log(response);
    callback(response.data);
  };
  
 