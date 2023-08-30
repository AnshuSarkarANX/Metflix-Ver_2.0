import  { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import SignUp from "./Signup";
import "./Signup.css";

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [signUp, setsignUp] = useState(false);
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
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
  return signUp ? (
    <SignUp />
  ) : (
    <div className="SignIn_body">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email address" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="signin" name="signin" onClick={signIn}>
          Signin
        </button>
        <h4>
          <span className="signUp_grey">New to Netflix? </span>
          <span className="signUp_link" onClick={() => setsignUp(true)}>
            Signup Now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignIn;
