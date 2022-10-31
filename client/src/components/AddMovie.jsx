import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputTags from "./InputTags";
import { Button } from "@mui/material";
import {addMovie} from '../services/service';

export default function AddMovie({ changePage }) {

    const [movieData, setMovieData] = useState({
        imageurl: '',
        movieName: '',
        producer: '',
        yearOfRelease: '',
        actors: ''
    });

    const handleDataChange = (e) => {
        setMovieData({ ...movieData, [e.target.name]: e.target.value });
    }

    const handleSubmitMovie = () => {
        addMovie(movieData);
        setTimeout(() => {
            changePage('all movies');
        }, 2000);
    }

    const handleClose = () => {
        changePage('all movies');
    };

    const actorsName = (value) => {
        movieData.actors = value;
    }

    return (
        <>
            <div style={{ textAlign: 'center', margin: '50px' }}>
                <h1 style={{ margin: '20px' }} >Add Movie</h1>
                <div>
                    <div className="moviedetails" style={{ margin: '20px' }}>
                        <TextField onChange={e => handleDataChange(e)} style={{ marginRight: '10px' }} autoComplete="off" name="imageurl" size='small' id="outlined-basic" label="Enter Image URL" variant="outlined" />
                        <TextField onChange={e => handleDataChange(e)} autoComplete="off" style={{ marginRight: '10px' }} name="movieName" size='small' id="outlined-basic" label="movie name" variant="outlined" />
                        <TextField onChange={e => handleDataChange(e)} style={{ marginRight: '10px' }} autoComplete="off" name="producer" size='small' id="outlined-basic" label="producer name" variant="outlined" />
                        <TextField onChange={e => handleDataChange(e)} autoComplete="off" name="yearOfRelease" size='small' id="outlined-basic" label="Year Of Release" variant="outlined" />
                    </div>
                    <div className="moviebio">
                        <FormControl size="medium" fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Movie Bio</InputLabel>
                            <OutlinedInput
                                onChange={e => handleDataChange(e)}
                                name="bio"
                                rows={Infinity}
                                id="outlined-adornment-amount"
                                label="Movie Bio"
                            />
                        </FormControl>
                    </div>
                </div>
                <div>
                    <InputTags actorsName={actorsName} />
                </div>
                <div>
                    <Button onClick={handleClose} style={{ marginRight: '10px' }} variant="contained">Cancel</Button>
                    <Button onClick={handleSubmitMovie} variant="outlined">Save</Button>
                </div>
            </div>
        </>
    );
}