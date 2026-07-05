import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center">
        <h1>The TradeFlow Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3 mt-3">
          <img src="media/images/smallcaseLogo.png" />
          <p className="text-small text-muted pt-3">
            Thematic investment platform
          </p>
        </div>
        <div className="col-4 p-3 mt-3">
          <img src="media/images/streakLogo.png" style={{ width: "30%" }} />
          <p className="text-small text-muted pt-3">Algo & strategy platform</p>
        </div>
        <div className="col-4 p-3 mt-3">
          <img src="media/images/sensibullLogo.svg" />
          <p className="text-small text-muted pt-3">Options trading platform</p>
        </div>
        <div className="col-4 p-3 mt-3">
          <img
            src="media/images/zerodhaFundhouse.png"
            style={{ width: "50%" }}
          />
          <p className="text-small text-muted pt-3">Asset management</p>
        </div>
        <div className="col-4 p-3 mt-3">
          <img src="media/images/goldenpiLogo.png" />
          <p className="text-small text-muted pt-3">Bonds trading platform</p>
        </div>
        <div className="col-4 p-3 mt-3">
          <img src="media/images/dittoLogo.png" style={{ width: "30%" }} />
          <p className="text-small text-muted pt-3">Insurance</p>
        </div>

        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto", textDecoration: "none" }}
        >
          Sign up Now
        </Link>
      </div>
    </div>
  );
}

export default Universe;
