import React from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <Typography variant="h2">
        No match for <code>{location.pathname}</code>
      </Typography>
    </div>
  );
}

export default NoMatch;
