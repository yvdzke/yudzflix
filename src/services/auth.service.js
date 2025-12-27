// Non Redux nyimpen aja disini
import axios from "axios";

const AUTH_URL = "https://69424ac3686bc3ca81692912.mockapi.io/yvdzke/users";

export const registerAuth = (data) => {
  return axios.post(AUTH_URL, data);
};

export const getUser = (callback) => {
  axios
    .get(AUTH_URL)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteUser = (id) => {
  return axios.delete(`${AUTH_URL}/${id}`);
};
