import axios from 'axios';
import URL from '../Helper';

function saveTokenInLocalStorage(tokenDtails){
    localStorage.setItem('userDetails', tokenDtails);
};

export const AddUser = (data) => {
    return axios.post(
        URL+"/auth/user/add",
        data
    ).then((res) => {
        saveTokenInLocalStorage(JSON.stringify(res.data));
    })
        .catch((e) => { throw e });
};

export const loginUser = (data) => {
    return axios.post(
        URL+"/auth/user/add",
        data
    ).then((res) => {
        saveTokenInLocalStorage(JSON.stringify(res.data));
    })
        .catch((e) => { throw e });
};