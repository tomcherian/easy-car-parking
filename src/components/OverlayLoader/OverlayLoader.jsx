import { CircularProgress } from "@mui/material";
import React from "react";
import "./OverlayLoader.css";

const OverlayLoader = () => {
  return (
    <div className="OverlayLoader_wrapper">
      <div className="OverlayLoader_backdrop">
        <CircularProgress />
      </div>
    </div>
  );
};

export default OverlayLoader;
