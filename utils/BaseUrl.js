/* export const baseUrl = "https://royalapi.herokuapp.com"; */
/* export const baseUrl = "http://localhost:9000";
export const mainUrl = "http://localhost:9000";
 */
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://royal0api.herokuapp.com/",
});
