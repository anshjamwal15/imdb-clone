import * as React from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import Movie from './Movie';

export default function MovieList() {

    const data = {
        movieList: [
            {
                movieName: "Avengers End Game",
                yearOfRelease: "2019",
                producedBy: "XYZ Director",
                imageUrl: "https://m.media-amazon.com/images/I/71niXI3lxlL._SY679_.jpg",
                actors: [
                    {
                        actorName: "Robert Downey Jr",
                        age: 48
                    },
                    {
                        actorName: "Scarlett Johnsson",
                        age: 36
                    },
                    {
                        actorName: "Mark Ruffalo",
                        age: 56
                    },
                    {
                        actorName: "Bill gates",
                        age: 63
                    },
                ]
            },
            {
                movieName: "Chupke Chupke",
                yearOfRelease: "1992",
                producedBy: "XYZ Director",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/09/Chupke_Chupke_1975.jpg",
                actors: [
                    {
                        actorName: "Amitab Bachhan",
                        age: 48
                    },
                    {
                        actorName: "Vinod Khanna",
                        age: 36
                    },
                    {
                        actorName: "Shah Rukh Khan",
                        age: 56
                    },
                    {
                        actorName: "Bill gates",
                        age: 63
                    },
                ]
            }
        ]
    };

    return (
        <>
            <div className='somethin' style={{ margin: "50px" }}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
                    {data.movieList.map((movie) => (
                        <Grid item>
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={movie.imageUrl}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {movie.movieName}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {movie.yearOfRelease}
                                    </Typography>
                                    <Typography sx={{ mb: 1.0 }} color="text.secondary">
                                        {movie.producedBy}
                                    </Typography>
                                    <Typography variant="body2">
                                        {movie.actors[0].actorName} , {movie.actors[1].actorName}
                                        <br />
                                        {movie.actors[2].actorName} , {movie.actors[3].actorName}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </div>
        </>
    );
}