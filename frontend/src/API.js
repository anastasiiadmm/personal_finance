import axiosApi from "./axiosApi";

const API = {
  registerUser: userData => {
    const data = new FormData();

    Object.keys(userData).forEach(key => {
      data.append(key, userData[key]);
    });

    return axiosApi.post('/users/signup', data);
  },
};

export default API;