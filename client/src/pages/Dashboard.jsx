import React, { useState, useEffect } from "react";
import MyAppBar from "../components/MyAppBar";
import MovieList from "../components/MovieList";
import AddMovie from "../components/AddMovie";
import Profile from "../components/Profile";

export default function Dashboard() {

    const [addMoviePage, setMoviePage] = useState([
        {
            addmovie: false,
            movielist: false,
            profile: false
        }
    ]);

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
    };

    useEffect(() => {
    }, [addMoviePage])

    return (
        <>
            <MyAppBar changePage={changePage} />
            {addMoviePage[0].addmovie === true ? <AddMovie /> : ''}
            {addMoviePage[0].movielist === true ? <MovieList /> : ''}
            {addMoviePage[0].profile === true ? <Profile /> : ''}
            {
                addMoviePage[0].addmovie === false && addMoviePage[0].movielist === false &&
                addMoviePage[0].profile === false ? 
                <MovieList /> : ''
            }
        </>
    );
}