import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

function Login() {
  const { user, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      window.location.href = "http://localhost:3001/";
    }
  }, [user, loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3002/auth/login",
        { email, password },
        { withCredentials: true }
      );
      window.location.href = "http://localhost:3001/";
    } catch (err) {
      setError(err.response?.data?.error || "Failed to login");
    }
  };

  if (loading) return <div className="container mt-5 p-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5 p-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="mb-4 text-center">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 fs-5 mb-3">
              Login
            </button>
          </form>
          <div className="text-center">
            <a href="/signup" style={{ textDecoration: "none" }}>
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
