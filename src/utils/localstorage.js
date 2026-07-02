const setAccessToken = (token) => {
    console.log("Setting access token: ");
    console.log(token);
    localStorage.setItem('accessToken', token);
}

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
}

const setRefreshToken = (token) => {
    localStorage.setItem('refreshToken', token);
}

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}

const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken');
}

export { setAccessToken, getAccessToken, removeAccessToken, setRefreshToken, getRefreshToken, removeRefreshToken };