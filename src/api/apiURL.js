import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

Api.defaults.headers.common["Content-Type"] = 'application/json';

export default Api