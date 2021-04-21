import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://api.ezfrontend.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});
// interceptors
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, 
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('ERROR RESPONSE: ', error.response);
    const { config, status, data } = error.response
    if(config.url === '/auth/local/register' && status === 400) {
      const errorList = data.data || []
      const firstError = errorList.length > 0 ? errorList[0] : {}
      const messageList = firstError.message || []
      const firstMessage = messageList.length > 0 ? messageList[0] : {}

      throw new Error(firstMessage.message)
    }
    return Promise.reject('123');
  });

export default axiosClient