import axios from "axios";

export const getMovies = (callback) => {
  axios
    .get("https://69424ac3686bc3ca81692912.mockapi.io/yvdzke/movies")
    .then((res) => {
      callback(res.data);
      console.log("Fetched Movies:", res);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
};
