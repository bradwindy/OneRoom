//Take json web token (JWT) that was returned from server, 
//we'll save it in local storage and we'll include it in every request as authorization header. 

import axios from 'axios';

export default function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}