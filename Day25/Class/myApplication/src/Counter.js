import { useState } from "react";
import * as React from 'react';
import { Badge, IconButton } from "@mui/material";

export function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, setdisLike] = useState(0);

  return (
    <div className="Counter">
      <IconButton onClick={() => setLike(like + 1)}
      className="bt-sz-lg"
      color="primary"
      aria-label="like">
        <Badge badgeContent={like} color="primary">
          👍
        </Badge>
      </IconButton>
      <IconButton onClick={() => setdisLike(dislike + 1)}
      className="bt-sz-lg"
      color="error"
      aria-label="dislike">
        <Badge badgeContent={dislike} color="error">
          👎
        </Badge>
      </IconButton>
    </div>
  );
}
