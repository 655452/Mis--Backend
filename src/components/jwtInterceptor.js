import axios from "axios";


const jwtInterceoptor = axios.create({});

jwtInterceoptor.interceptors.request.use((config) => {
  let tokensData =localStorage.getItem("refresh_token");
  config.headers.common["Authorization"] = `bearer ${tokensData}`;
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      

      let apiResponse = await axios.post(
        "http://localhost:8080/api/v1/auth/refresh-token",
        
      );

      const { access_token: newToken } = apiResponse.data;// the will only store acess token not refresh token

      // refresh token
      const { refresh_token: newRefreshToken } = apiResponse.data;
      localStorage.setItem("refresh_token", newRefreshToken);
      

  

      localStorage.setItem("token", newToken);// access token
      error.config.headers[
        "Authorization"
      ] = `bearer ${newToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceoptor;
