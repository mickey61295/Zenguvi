import { Badge, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";
import { Counter } from "./Counter";
export function Profile(props) {
    const { name, img, rating, summary } = props;
    const [displayState, setDisplayState] = useState("visible");
    const styles = {
      visibility: displayState,
    };
    const [descToggle, setDescToggle] = useState(true);
    return (
      <div className="movie-container">
        
          <img className="movie-poster" src={img} alt={name} />
          <div className="movie-specs">

        <h2 className="movie-name">{name}
        <IconButton
        onClick={() => {
          setDisplayState(displayState === "visible" ? "hidden" : "visible");
          setDescToggle(!descToggle);
        } }
          className="bt-sz-lg"
          color="primary"
          aria-label="like">
          {descToggle ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
        </h2>
        <p style = {{color: rating <= 8 ? rating <=6.5? "Red":"Yellow" : "Green"}}className="movie-rating">⭐{rating}</p>
        </div>
        
        <div className="movie-desc">
        <p style={styles} className="movie-summary">{summary}</p>
        <Counter />
        </div>
      </div>
    );
  }

