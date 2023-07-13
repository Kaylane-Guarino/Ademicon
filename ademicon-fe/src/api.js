import axios from 'axios';

const getToken = () => {
    return localStorage.getItem('token');
};

axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const RegisterApi = (data) => {
    return axios.post('http://localhost:8089/auth/register', data)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            return error.response.status;
        });
};

const LoginApi = (data) => {
    return axios.post('http://localhost:8089/auth', data)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response.status;
        });
};

const getAllClients = () => {
    return axios.get('http://localhost:8089/')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.status;
        });
};

const createClient = (data) => {
    return axios.post('http://localhost:8089/', data)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            return error.response.status;
        });
};

const editClient = (id, data) => {
    return axios.put(`http://localhost:8089/${id}`, data)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            return error.response.status;
        });
};

const deleteClient = (id) => {
    return axios.delete(`http://localhost:8089/${id}`)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            return error.response.status;
        });
};

const getClient = (id) => {
    return axios.get(`http://localhost:8089/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.status;
        });
};

export {
    RegisterApi,
    LoginApi,
    getAllClients,
    createClient,
    editClient,
    deleteClient,
    getClient
};
