import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { TextField, Button } from "@mui/material";
import Rating from '@mui/material/Rating';

export default function MovieInfo() {

    const [rating, setRating] = useState();

    const ratingChange = (e) => {
        setRating(e.target.value);
    }

    return (
        <>
            <div style={{ margin: '50px' }}>
                <div className="w3-content w3-margin-top" style={{ maxWidth: '1400px' }}>
                    <div className="w3-row-padding">
                        <div className="w3-third">
                            <div className="w3-white w3-text-grey w3-card-4">
                                <h1 style={{ textAlign: 'center' }}>Sholay</h1>
                                <div className="w3-display-container">
                                    <Avatar sx={{ width: 100, height: 100, marginLeft: '135px' }} alt="Remy Sharp" src="https://www.w3schools.com/w3images/avatar_hat.jpg" />
                                    <div className="w3-container">
                                        <h2></h2>
                                    </div>
                                </div>
                                <div className="w3-container">
                                    <p>Produced By : Saleem khan</p>
                                    <div style={{display: 'flex'}}>
                                        <p style={{margin: '0'}}>Rate : </p>
                                        <Rating onChange={ratingChange} name="size-large" size="large" />
                                    </div>
                                    <p>Year of Release : 1975</p>
                                </div>
                                <hr />
                            </div><br />
                        </div>
                        <div className="w3-twothird">
                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 className="w3-text-grey w3-padding-16">Edit User</h2>
                                <div className="w3-container">
                                    <TextField style={{ marginRight: '10px' }} autoComplete="off" name="userName" size='small' id="outlined-basic" label="username" variant="outlined" />
                                    <TextField style={{ marginRight: '10px' }} autoComplete="off" name="email" size='small' id="outlined-basic" label="email" variant="outlined" />
                                    <Button style={{ marginRight: '10px' }} variant="contained">Cancel</Button>
                                    <Button variant="outlined">Save</Button>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}