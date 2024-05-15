import axios from "axios";

const Api = axios.create({
    // baseURL: 'http://64.23.198.170:9393/api/'
    baseURL: 'http://localhost:3000/api/'
})

Api.defaults.headers.common["Content-Type"] = 'application/json';

export default Api