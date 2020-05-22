const config = { 
    headers: {
        Authorization: '',
        baseURL: process.env.NODE_ENV === 'production' ? 'https://manny-mgmt-server.herokuapp.com' : 'http://localhost:8080'
    }
};

const axiosConfig = (state = config, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                headers: {
                    ...config.headers,
                    Authorization: action.payload
                }
            };
        case 'LOGOUT':
            return config;
        default:
            return state;
    }
}

export default axiosConfig;