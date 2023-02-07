import md5 from 'md5';
import axios from 'axios';

const publicKey = '8d750d268b6ea1c9a31387f01baf35af';
const privateKey = '6d5934ec085004bc8b763990bb326ff806f535f9';
const ts = Number(new Date()); 
const hash = md5(ts + privateKey + publicKey);

const api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public/',
    params:{
        ts,
        apikey: publicKey,
        hash,
    },
});

export default api;