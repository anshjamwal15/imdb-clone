import React, { useState, useEffect } from "react";
import MyAppBar from "../components/MyAppBar";
import MovieList from "../components/MovieList";
import AddMovie from "../components/AddMovie";
import Profile from "../components/Profile";
import MovieInfo from "../components/MovieInfo";

export default function Dashboard() {

    const [addMoviePage, setMoviePage] = useState([
        {
            addmovie: false,
            movielist: false,
            profile: false,
            movieInfo: false
        }
    ]);

    const [movieId, setMovieId] = useState();

    const changePage = (value) => {
        let pageStates = [{
            addmovie: false,
            movielist: false,
            profile: false
        }];
        if (value === 'add movie') {
            pageStates[0].addmovie = true;
            setMoviePage(pageStates);
        }
        if (value === 'all movies') {
            pageStates[0].movielist = true;
            setMoviePage(pageStates);
        }
        if (value === 'profile') {
            pageStates[0].profile = true;
            setMoviePage(pageStates);
        }
        if (value === 'movie details') {
            pageStates[0].movieInfo = true;
            setMoviePage(pageStates);
        }
    };

    const movieDetail = (e) => {
        setMovieId(e);
    }

    useEffect(() => {
    }, [addMoviePage])

    return (
        <>
            <MyAppBar changePage={changePage} />
            {addMoviePage[0].addmovie === true ? <AddMovie /> : ''}
            {addMoviePage[0].movielist === true ? <MovieList movieDetail={movieDetail} changePage={changePage} /> : ''}
            {addMoviePage[0].profile === true ? <Profile /> : ''}
            {addMoviePage[0].movieInfo === true ? <MovieInfo movieId={movieId} /> : ''}
            {
                addMoviePage[0].addmovie === false && addMoviePage[0].movielist === false &&
                addMoviePage[0].profile === false && addMoviePage[0].movieInfo === false ? 
                <MovieList movieDetail={movieDetail} changePage={changePage} /> : ''
            }
        </>
    );
}