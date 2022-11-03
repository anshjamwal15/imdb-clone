import axios from 'axios';
import URL from '../Helper';

function saveTokenInLocalStorage(tokenDtails) {
    localStorage.setItem('userDetails', tokenDtails);
};

export const AddUser = (data) => {
    return axios.post(
        URL + "/auth/user/add",
        data
    ).then((res) => {
        saveTokenInLocalStorage(JSON.stringify(res.data));
    })
        .catch((e) => { throw e });
};

export const loginUser = (data) => {
    return axios.post(
        URL + "/auth/user/login",
        data
    ).then((res) => {
        saveTokenInLocalStorage(JSON.stringify(res.data));
    })
        .catch((e) => { throw e });
};

export const editMovie = (data, index) => {

    let newData = { index, data }

    return axios.post(
        URL + "/auth/movies/editmovie",
        newData
    ).then((res) => { })
        .catch((e) => console.log(e));
};

export const addMovie = (data) => {

    let actorsArr = [];

    data.actors.map((actor) => {
        let newActor = {
            name: actor,
            gender: '',
            dob: '',
            bio: ''
        };
        actorsArr.push(newActor);
    });

    let newData = {
        movie: {
            newMovieName: data.movieName,
            yearOfRelease: data.yearOfRelease,
            plot: data.bio,
            poster: data.imageurl
        },
        producer: {
            name: data.producer,
            gender: '',
            dob: '',
            bio: '',
        },
        actors: actorsArr
    };
    return axios.post(
        URL + "/auth/movies/addmovie",
        newData,
    ).then((res) => { })
        .catch((e) => console.log(e));
};

export const getUser = (req) => {
    return axios.get(
        URL + "/auth/user/getuser",
        { params: { userId: req } }
    ).then(res => res)
        .catch((e) => console.log(e));
}

export const editUser = (data, userId) => {

    let req = { userId, data };
    
    return axios.post(
        URL + "/auth/user/edituser",
        req
    ).then(res => res)
        .catch(e => console.log(e));
}

export const getMovie = (movieId) => {
    return axios.get(
        URL + "/auth/movies/getmovies",
        { params: { movieId: movieId } }
    ).then(res => res)
        .catch(e => console.log(e));

}

export const addRating = (movieId,userId,count) => {
    let data = { movieId, userId, count };
    return axios.post(
        URL+"/auth/movies/ratemovie",
        data
    ).then(res => res)
    .catch((e) => console.log(e));
};

export const getRating = (userId,movieId) => {
    return axios.get(
        URL+"/auth/user/userrating",
        { params: { userId: userId, movieId: movieId } }
    ).then(res => res)
    .catch((e) => console.log(e));
};