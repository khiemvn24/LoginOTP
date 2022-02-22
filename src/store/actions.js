
export const Login = (internalVal) => {
    const token = internalVal;
    return ({
        type: 'LOGIN',
        payload: token,
    })
}

export const Logout = () => {
    return ({
        type: 'LOGOUT',
        payload: null,
    })
}