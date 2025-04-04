const {default: axios} = require('axios');

export const BASE_URL  = 'https://linked-in-backend-alpha.vercel.app/'

export const clientServer = axios.create({
    baseURL: BASE_URL,
})
