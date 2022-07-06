import axios from "axios";
import { parseCookies } from "nookies";

const { "royalDashboard-Admin-Token": Token } = parseCookies();
/* baseURL: "https://royal0api.herokuapp.com/", */
/*  baseURL: "http://localhost:9000/", */
export const AxiosInstance = axios.create({
  baseURL: "https://royal0api.herokuapp.com/",
});
