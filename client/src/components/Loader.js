// import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import React, { useState, useEffect } from "react";

function Error() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffa31a");
  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        width: "94vw",
      }}
    >
      <div className="sweet-loading text-center">
        <PuffLoader
          color={color}
          loading={loading}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Error;
