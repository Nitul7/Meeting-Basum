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

const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

const removeUser = () => {
    localStorage.removeItem('user');
}

export { setAccessToken, getAccessToken, removeAccessToken, setRefreshToken, getRefreshToken, removeRefreshToken, setUser, getUser, removeUser };