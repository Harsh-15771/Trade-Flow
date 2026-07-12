import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/harshMishra.jpg"
            alt="Founder"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Harsh Mishra</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Harsh is a passionate Full-Stack Developer and Machine Learning Enthusiast
            who built Trade Flow to showcase his expertise in highly scalable microservices
            architecture, DevOps, and modern web development.
          </p>
          <p>
            He enjoys building complex systems, optimizing backend performance, and 
            exploring the intersections of Cloud Infrastructure and Software Engineering.
          </p>
          <p>Coding and learning new technologies are his zen.</p>
          <p>
            Connect on <a href="https://github.com/Harsh-15771" target="_blank" rel="noreferrer">GitHub</a> / <a href="http://linkedin.com/in/harshm28" target="_blank" rel="noreferrer">LinkedIn</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
