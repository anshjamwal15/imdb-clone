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
import { BsSave } from 'react-icons/bs';
import { editMovie } from "../services/service";

export default function MovieList({changePage,movieDetail}) {

    const [movies, setMovies] = React.useState([]);

    const [openMovie, setOpenMovie] = React.useState();

    const [openYear, setOpenYear] = React.useState();

    const [openProducer, setOpenProducer] = React.useState();

    const [updatedMovie, setUpdatedMovie] = React.useState({
        movieName: '',
        yearOfRelease: '',
        producer: '',
    });

    const handleMovieChange = (e) => {
        setUpdatedMovie({ ...updatedMovie, [e.target.name]: e.target.value });
    };

    React.useEffect(() => {
        setTimeout(() => {
            fetch(URL + "/auth/movies/getallmovies")
                .then((res) => res.json())
                .then((data) => {
                    setMovies(data);
                });
        }, 1000);
    }, [movies]);

    const toggleMovie = (index) => {
        setOpenMovie(index);
    };

    const closeMovie = () => {
        setOpenMovie(null);
    };

    const toggleYear = (index) => {
        setOpenYear(index);
    };

    const closeYear = () => {
        setOpenYear(null);
    };

    const toggleProducer = (index) => {
        setOpenProducer(index);
    };

    const closeProducer = () => {
        setOpenProducer(null);
    };

    const editMovies = (index) => {

        if(updatedMovie.movieName !== "") {
            editMovie(updatedMovie, index);
            setOpenMovie(null);
            updatedMovie.movieName = "";
        }
        if(updatedMovie.producer !== "") {
            editMovie(updatedMovie, index);
            setOpenProducer(null);
            updatedMovie.producer = ""
        }
        if(updatedMovie.yearOfRelease !== "") {
            editMovie(updatedMovie, index);
            setOpenYear(null);
            updatedMovie.yearOfRelease = "";
        }
    }

    const movieDetails = (id) => {
        movieDetail(id);
        changePage('movie details');
    }

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
                                alt="img"
                            />
                            <CardContent>
                                <div style={{ display: 'flex' }}>
                                    <Typography className={openMovie === index ? 'inputFields' : ''} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {movie.name}
                                    </Typography>
                                    <div className={openMovie === index ? '' : 'inputFields'}>
                                        <TextField value={updatedMovie.movieName} name="movieName" onChange={e => handleMovieChange(e)} size='small' id="outlined-basic" label="movie name" variant="outlined" />
                                        <AiOutlineCloseCircle onClick={() => closeMovie()} className={openMovie === index ? '' : 'inputFields'} style={{ marginLeft: '8px', marginTop: '10px' }} />
                                        <BsSave onClick={() => editMovies(movie.id)} className={openMovie === index ? '' : 'inputFields'} style={{ marginLeft: '6px', }} />
                                    </div>
                                    <AiFillEdit className={openMovie === index ? 'inputFields' : ''} onClick={() => toggleMovie(index)} style={{ marginLeft: '4px', marginTop: '2px' }} />
                                </div>

                                <div style={{ display: 'flex' }}>
                                    <Typography className={openYear === index ? 'inputFields' : ''} variant="h6" component="div">
                                        {movie.yearOfRelease}
                                    </Typography>
                                    <div className={openYear === index ? '' : 'inputFields'}>
                                        <TextField value={updatedMovie.yearOfRelease} name="yearOfRelease" onChange={e => handleMovieChange(e)} size='small' id="outlined-basic" label="Year of Release" variant="outlined" />
                                        <AiOutlineCloseCircle onClick={() => closeYear()} className={openYear === index ? '' : 'inputFields'} style={{ marginLeft: '8px', marginTop: '10px' }} />
                                        <BsSave onClick={() => editMovies(movie.id)} className={openYear === index ? '' : 'inputFields'} style={{ marginLeft: '6px', }} />
                                    </div>
                                    <AiFillEdit className={openYear === index ? 'inputFields' : ''} onClick={() => toggleYear(index)} style={{ marginLeft: '4px', marginTop: '2px' }} />
                                </div>

                                <div style={{ display: 'flex' }}>
                                    <Typography className={openProducer === index ? 'inputFields' : ''} sx={{ mb: 1.0 }} color="text.secondary">
                                        {movie.producer.name}
                                    </Typography>
                                    <div className={openProducer === index ? '' : 'inputFields'}>
                                        <TextField value={updatedMovie.producer} name="producer" onChange={e => handleMovieChange(e)} size='small' id="outlined-basic" label="producer name" variant="outlined" />
                                        <AiOutlineCloseCircle onClick={() => closeProducer()} className={openProducer === index ? '' : 'inputFields'} style={{ marginLeft: '8px', marginTop: '10px' }} />
                                        <BsSave onClick={() => editMovies(movie.producer.id)} className={openProducer === index ? '' : 'inputFields'} style={{ marginLeft: '6px', }} />
                                    </div>
                                    <AiFillEdit className={openProducer === index ? 'inputFields' : ''} onClick={() => toggleProducer(index)} style={{ marginLeft: '4px', marginTop: '2px' }} />
                                </div>

                                <div style={{ display: 'flex' }}>
                                    <Typography variant="body2">
                                        {movie.actors[0].name} , {movie.actors[1].name}
                                    </Typography>
                                </div>
                            </CardContent>

                            <CardActions>
                                <Button onClick={() => movieDetails(movie.id)} size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}