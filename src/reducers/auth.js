const config = { 
    headers: {
        Authorization: '',
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