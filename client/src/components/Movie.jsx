import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    ,
  </Box>
);

const logo = "https://m.media-amazon.com/images/I/71niXI3lxlL._SY679_.jpg";

const card = (
  <React.Fragment>
    <CardMedia
      component="img"
      height="140"
      image={logo}
      alt="green iguana"
    />
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Avengers: End Game
      </Typography>
      <Typography variant="h6" component="div">
        Year of release : 2019
      </Typography>
      <Typography sx={{ mb: 1.0 }} color="text.secondary">
        Produced By : Xyz Director
      </Typography>
      <Typography variant="body2">
        Robert Downey Jr {bull} Scarlett Johnsson
        <br />
        Mark Ruffalo {bull} Bill gates
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function Movie() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}