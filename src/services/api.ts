import axios from 'axios'
 
const api = axios.create({
    baseURL: 'https://aluno-backendd.herokuapp.com'
})
 
export default api;