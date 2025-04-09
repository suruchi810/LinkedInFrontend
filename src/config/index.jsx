const {default: axios} = require('axios');

export const BASE_URL  = 'https://linkedinbackend-i0sg.onrender.com'

export const clientServer = axios.create({
    baseURL: BASE_URL,
})
