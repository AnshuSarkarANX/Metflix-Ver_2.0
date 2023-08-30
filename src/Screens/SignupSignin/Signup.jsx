import React, { useRef } from "react";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../firebase";
import "./Signup.css";

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authuser) => {
        console.log(authuser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="SignIn_body">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email address" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="signin" name="signin" onClick={register}>
          Create Account
        </button>
      </form>
    </div>
  );
}
export default SignUp;
