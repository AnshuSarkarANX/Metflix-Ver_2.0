/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-globals */
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import search from "./search.svg";
import "./navbar.css";

function navbar() {
  const [show, handleshow] = useState(false);
  const Navigate = useNavigate();
  const goHome = () => {
    window.history.replaceState(null, "", "/");
    Navigate("/");
  };

  const Navbar_transition = () => {
    window.scrollY > 400 ? handleshow(true) : handleshow(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", Navbar_transition);
    return () => removeEventListener("scroll", Navbar_transition);
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="navbar_container">
        <img
          onClick={() => goHome()}
          className="Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png?20170904093427"
          alt="logo"
        />
        <div className="nav_right">
          <p className={`Search_container_hide ${show && "Search_container"}`}>
            <span>
              <img className="Search" src={search} alt="Search" />
            </span>
            <span className="Search_text">Search</span>
          </p>
          <img
            onClick={() => Navigate("/profilescreen")}
            className="avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlxIi9VcRXindEC1M94AOqTnCaU0-16LidGg&usqp=CAU"
            alt="your avatar"
          />
        </div>
      </div>
    </div>
  );
}

export default navbar;
