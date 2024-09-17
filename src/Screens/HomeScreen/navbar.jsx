/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-globals */
import React ,{  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";


function navbar({child}) {
  const [show, handleshow] = useState(false);
  const Navigate = useNavigate();
  const goHome = () => {
    window.history.replaceState(null, "", "/");
    Navigate("/");
  };
 const renderChildren = ()=>
 {
  return React.cloneElement(child,{
    show:{show}
  });
 }
  const Navbar_transition = () => {window.scrollY > 400 ? handleshow(true) : handleshow(false);};

  useEffect(() => {
    window.addEventListener("scroll", Navbar_transition);
    return () => removeEventListener("scroll", Navbar_transition);
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="navbar_container">
        <img
          onClick={goHome}
          className="Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png?20170904093427"
          alt="logo"
        />
        <div className="nav_right">
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
