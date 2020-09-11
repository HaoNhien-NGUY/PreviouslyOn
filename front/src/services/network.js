import axios from 'axios';

axios.interceptors.response.use(
    response => response,
    error => (error.response ? error.response : null),
);

export { axios as network }