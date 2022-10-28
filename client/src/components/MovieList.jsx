import * as React from 'react';
import '../components/assets/MovieList.css';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CardMedia } from '@mui/material';
import URL from '../Helper';
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai';

export default function MovieList() {

    const [movies, setMovies] = React.useState([]);

    const [isActive, setActive] = React.useState();

    React.useEffect(() => {
        setTimeout(() => {
            fetch(URL + "/auth/movies/getallmovies")
                .then((res) => res.json())
                .then((data) => {
                    setMovies(data);
                });
        }, 1000);
    }, [movies]);

    const toggleClass = (index) => {
        setActive(index);
    };

    const toggleClose = () => {
        setActive(null);
    };
    
    return (
        <div className='somethin' style={{ margin: "50px" }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
                {movies.map((movie, index) => (
                    <Grid key={index} item>
                        <Card key={index} variant="outlined">
                            <CardMedia
                                component="img"
                                height="140"
                                image={movie.poster}
                                alt="green iguana"
                            />
                            <CardContent>
                                <div style={{ display: 'flex' }}>
                                    <Typography className={isActive == index ? 'inputFields' : ''} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {movie.name}
                                    </Typography>
                                    <div className={isActive == index ? '' : 'inputFields'}>
                                        <TextField size='small' id="outlined-basic" label="movie name" variant="outlined" />
                                        <AiOutlineCloseCircle onClick={() => toggleClose()} className={isActive == index ? '' : 'inputFields'} style={{ marginLeft: '8px', marginTop: '10px' }} />
                                    </div>
                                    <AiFillEdit className={isActive == index ? 'inputFields' : ''} onClick={() => toggleClass(index)} style={{ marginLeft: '4px', marginTop: '2px' }} />
                                </div>

                                <Typography variant="h6" component="div">
                                    {movie.yearOfRelease}
                                </Typography>
                                {/* <TextField size='small' id="outlined-basic" label="Movie name" variant="outlined" /> */}
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
    );
}