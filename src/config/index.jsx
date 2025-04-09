const {default: axios} = require('axios');

export const BASE_URL  = 'https://linkedinbackend-1-zyst.onrender.com'

export const clientServer = axios.create({
    baseURL: BASE_URL,
})
