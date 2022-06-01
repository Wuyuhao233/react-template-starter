import axios from 'axios'
export const RequestMenu = axios({
    method:'get',
    url:'http://localhost:3010/menu'
})