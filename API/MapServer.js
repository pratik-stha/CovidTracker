import axios from 'axios';



const MapServ = axios.create({
    baseURL: 'https://www.trackcorona.live/api/provinces',

});


MapServ.interceptors.request.use(
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
  
  export const getMapData = async (callback) => {
    const response = await MapServ.get()
    //console.log(response);
    callback(response.data);
  };
  
 