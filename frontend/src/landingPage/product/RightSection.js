import React from "react";

function RightSec({ imgUrl, productName, productDesc, learnMore }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1>{productName}</h1>
          <p>{productDesc}</p>
          <a href={learnMore} style={{ textDecoration: "none" }}>
            Learn More<i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="col-6">
          <img src={imgUrl} style={{ height: "90%" }} />
        </div>
      </div>
    </div>
  );
}

export default RightSec;
