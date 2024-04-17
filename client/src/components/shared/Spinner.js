import React from "react";

const Spinner = () => {
  return (
    <div className="loader-container">
      <div class="spinner-grow text-primary" role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
      <div class="spinner-grow text-secondary" role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
      <div class="spinner-grow text-success" role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
      <div class="spinner-grow text-danger" role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
      <div class="spinner-grow text-warning" role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
      <div class="spinner-grow text-info" role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
      <div class="spinner-grow text-light" role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
      <div class="spinner-grow text-dark" role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
      <span className="mb-10">Loading......</span>
    </div>
  );
};

export default Spinner;
