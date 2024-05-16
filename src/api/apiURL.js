import axios from "axios";

const Api = axios.create({
    // baseURL: 'http://64.23.198.170:9393/api/'
    // baseURL: 'http://localhost:3000/api/'
    baseURL: 'https://dsbl7ssb-3000.usw3.devtunnels.ms/api/'
})

Api.defaults.headers.common["Content-Type"] = 'application/json';

export default Api