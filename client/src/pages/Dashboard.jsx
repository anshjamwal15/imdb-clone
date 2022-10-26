import React, { useState } from "react";
import MyAppBar from "../components/MyAppBar";
import MovieList from "../components/MovieList";

export default function Dashboard() {

    return (
        <>
            <MyAppBar />
            <MovieList />
        </>
    );
}