import axios from "axios";

export default axios.create({
  baseURL: "https://expense-control-api.herokuapp.com/api/v1/",
  responseType: "json"
});