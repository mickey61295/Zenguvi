import { useState } from "react";
export function Profile(props) {
    const { name, img, rating, summary } = props;
    const [displayState, setDisplayState] = useState("visible");
    const styles = {
      visibility: displayState,
    };
    return (
      <div className="movie-container">
        
          <img className="movie-poster" src={img} alt={name} />
          <div className="movie-specs">
        <h2 className="movie-name">{name}</h2>
        <p style = {{color: rating <= 8 ? rating <=6.5? "Red":"Yellow" : "Green"}}className="movie-rating">⭐{rating}</p>
        </div>
        <button className="desc-togl-btn" 
        onClick={() => {
          setDisplayState(displayState === "visible" ? "hidden" : "visible");
        } }
        >Toggle Descrption</button>
        
        <div className="movie-desc">
        <p style={styles} className="movie-summary">{summary}</p>
        </div>
      </div>
    );
  }

