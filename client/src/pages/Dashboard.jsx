import React, { useState, useEffect } from "react";
import MyAppBar from "../components/MyAppBar";
import MovieList from "../components/MovieList";
import AddMovie from "../components/AddMovie";

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

    if (addMoviePage[0].addmovie === true) {
        return (
            <>
                <MyAppBar changePage={changePage} />
                <AddMovie />
            </>
        );
    } else if (addMoviePage[0].movielist === true) {
        return (
            <>
                <MyAppBar changePage={changePage} />
                <MovieList />
            </>
        );
    } else if (addMoviePage[0].profile === true) {
        return (
            <>
                <MyAppBar changePage={changePage} />
                <h1>I Am profile</h1>
                {/* <MovieList /> */}
            </>
        );
    } else {
        return (
            <>
                <MyAppBar changePage={changePage} />
                <MovieList />
            </>
        );
    }


}