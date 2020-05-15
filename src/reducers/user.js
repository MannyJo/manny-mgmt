const user = {
    id: 0,
    username: '',
    roleId: 2
};

const userInfo = (state = user, action) => {
    switch (action.type) {
        case 'SET_USERINFO':
            return {
                id: action.payload.id,
                username: action.payload.username,
                roleId: action.payload.roleId
            }
        case 'UNSET_USERINFO':
            return user;
        default:
            return state;
    }
}

export default userInfo;