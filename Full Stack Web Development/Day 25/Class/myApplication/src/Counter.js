import { useState } from "react";
export function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, setdisLike] = useState(0);
  return (
    <div>
      <button onClick={() => setLike(like + 1)} className="Button">
        👍{like}
      </button>
      <button
        onClick={() => {
          setLike(0);
          setdisLike(0);
        }}
        className="Button"
      >
        Reset
      </button>
      <button onClick={() => setdisLike(dislike + 1)} className="Button">
        👎{dislike}
      </button>
    </div>
  );
}
