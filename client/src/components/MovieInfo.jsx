import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import URL from '../Helper';
import { addRating, getRating } from '../services/service';

export default function MovieInfo({ movieId }) {

    const [rating, setRating] = useState();

    const [movieInfo, setMovieInfo] = useState([]);

    const user = JSON.parse(localStorage.getItem('userDetails'));

    useEffect(() => {
        fetch(URL + `/auth/movies/getmovies?movieId=${movieId}`).then((res) => res.json())
            .then((data) => {
                setMovieInfo(data);
            });
        getRating(user._id, movieId).then((res) => setRating(res.data)).catch((e) => console.log(e));
    },[rating]);

    const ratingChange = (e) => {
        addRating(movieId, user._id, e.target.value);
    }
    
    return (
        <>
            <div style={{ margin: '50px' }}>
                <div className="w3-content w3-margin-top" style={{ maxWidth: '1400px' }}>
                    <div className="w3-row-padding">
                        <div className="w3-third">
                            <div className="w3-white w3-text-grey w3-card-4">
                                <h1 style={{ textAlign: 'center' }}>{movieInfo.name}</h1>
                                <div className="w3-display-container">
                                    <Avatar sx={{ width: 100, height: 100, marginLeft: '135px' }} alt="Remy Sharp" src={movieInfo.poster} />
                                    <div className="w3-container">
                                        <h2></h2>
                                    </div>
                                </div>
                                <div className="w3-container">
                                    <p>Produced By : {movieInfo.producer !== undefined ? movieInfo.producer.name : ''}</p>
                                    <div style={{ display: 'flex' }}>
                                        <p style={{ margin: '0' }}>Rate : </p>
                                        <Rating value={rating !== undefined && rating.length > 0
                                            ? Number(rating[0].count) : 0} onChange={ratingChange} name="size-large" size="large" />
                                    </div>
                                    <p>Year of Release : {movieInfo.yearOfRelease}</p>
                                </div>
                                <hr />
                            </div><br />
                        </div>
                        <div className="w3-twothird">
                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 className="w3-text-grey w3-padding-16">Movie Information</h2>
                                <div className="w3-container">
                                    <p>{movieInfo.plot}</p>
                                </div>
                                <hr />
                                <Stack style={{ margin: '10px' }} direction="row" spacing={2}>
                                    {movieInfo.actors !== undefined ? movieInfo.actors.map((actor) => (
                                        <Item key={actor.name}>{actor.name}</Item>
                                    )) : ''}
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
}));