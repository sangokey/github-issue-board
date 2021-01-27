import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <nav>
        <Link to="/">
          <h4>Home</h4>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
