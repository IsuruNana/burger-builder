import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-1e7ea.firebaseio.com/'
});

export default instance;