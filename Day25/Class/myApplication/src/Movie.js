import { IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";
import { Counter } from "./Counter";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { NotFoundPage } from "./NotFoundPage";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActions } from "@mui/material";
import { useEffect } from "react";
import { API } from "./global";

export function Profile({movie, id, deleteButton, editButton}) {
  const navigate = useNavigate();
    const { name, poster, rating, summary} = movie;
    const [descToggle, setDescToggle] = useState(true);
    return (
      <Card className="movie-container">
        <CardMedia
          className="movie-poster"
          image={poster}
          title={name}        
        />
          <CardContent className="movie-specs">

        <h2 className="movie-name">{name}
        <IconButton
        onClick={() => {
          setDescToggle(!descToggle);
        } }
          className="bt-sz-lg"
          color="primary"
          aria-label="like">
          {descToggle ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
        <IconButton
        onClick={() => {
          navigate("/movies/" + id);
        } }
          className="bt-sz-lg"
          color="primary"
          aria-label="like">
          <InfoIcon />
        </IconButton>
        </h2>
        
        <p style = {{color: rating <= 8 ? rating <=6.5? "Red":"blue" : "Green"}}className="movie-rating">⭐{rating}</p>
        </CardContent>
        
        <div className="movie-desc">
        {descToggle ? <p className="movie-summary">{summary}</p> : ""}
        <CardActions className="Actions">
        <Counter key={name}/> {deleteButton} {editButton}
        </CardActions>
        </div>
      </Card>
    );
  }

export function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
    useEffect(() => {
      fetch(`${API}/${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
    }, [id])
  try {
    // const {name,rating,summary,trailer} = movieList[id];
    
    const {name,rating,summary,trailer} = movie;
  
  return (

    <div className="pageContainer">
      <iframe 
        width="100%"
        height="570"
        src={trailer}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
      <div className="movie-detail-container">
      
        <div className="movie-specs">

      <h2 className="movie-name">{name}</h2>
      
      <p style = {{color: rating <= 8 ? rating <=6.5? "Red":"blue" : "Green"}}className="movie-rating">⭐{rating}</p>
      </div>
      
      <div className="movie-desc">
      <p className="movie-details-summary">{summary}</p>
      <Button
        onClick={
          () => {
            // change url
            navigate(-1);
            } 
          }
        color="primary"
        variant="contained"
        startIcon={<KeyboardBackspaceIcon />}>
          Back
      </Button>
      </div>
    </div>    
    </div>
  )
}
catch(err) {
  return <NotFoundPage />
}
}