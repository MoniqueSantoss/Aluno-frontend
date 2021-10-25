import axios from 'axios'
 
const api = axios.create({
    baseURL: 'https://tarefa-backendd.herokuapp.com'
})
 
export default api;