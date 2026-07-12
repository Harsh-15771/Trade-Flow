import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <nav
      class="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#fff" }}
    >
      <div class="container p-2">
        <Link class="navbar-brand" to="/">
          <img
            src="media/images/tradeflow_logo.png"
            alt="Logo"
            style={{ width: "30%" }}
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex" role="search">
            <ul class="navbar-nav mb-lg-0">
              {user ? (
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="http://localhost:3001/">
                    Dashboard
                  </a>
                </li>
              ) : (
                <>
                  <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/login">
                      Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/signup">
                      Signup
                    </Link>
                  </li>
                </>
              )}
              <li class="nav-item">
                <Link class="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/product">
                  Product
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/support">
                  Support
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
