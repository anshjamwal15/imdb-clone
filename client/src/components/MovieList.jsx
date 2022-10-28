import * as React from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import URL from '../Helper';
import axios from 'axios';

export default function MovieList() {

    const [movies, setMovies] = React.useState([]);

    React.useEffect(() => {
        axios.get(URL+"/auth/movies/getallmovies").then(res => setMovies(res.data));
    }, []);

    return (
        <>
            <div className='somethin' style={{ margin: "50px" }}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
                    {movies.map((movie) => (
                        <Grid item>
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={movie.poster}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {movie.name}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {movie.yearOfRelease}
                                    </Typography>
                                    <Typography sx={{ mb: 1.0 }} color="text.secondary">
                                        {movie.producer.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {movie.actors[0].name} , {movie.actors[1].name}
                                        <br />
                                        {/* {movie.actors[2].actorName} , {movie.actors[3].actorName} */}
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