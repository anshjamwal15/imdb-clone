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

export const editMovie = (data,index) => {
    console.log(data, index);
    // return axios.post(
    //     URL+"/auth/movies/editmovie",
    //     data, {
    //         params: {
    //             index
    //         }
    //     }
    // ).then((res) => {
    // }).catch((e) => console.log(e));
};