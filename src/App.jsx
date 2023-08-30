/* eslint-disable no-unreachable */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
//components
import "./App.css";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import HomeScreen from "./Screens/HomeScreen/Homescreen.jsx";
import LoginScreen from "./Screens/LoginScreen/LoginScreen.jsx";
import ProfileScreen from "./Screens/ProfileScreen/ProflieScreen.jsx";
import Error from "./ErrorPage.jsx";

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        //logged in
        dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
      }
      //logged out
      else dispatch(logout());
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/profilescreen" element={<ProfileScreen />} />
            <Route path="*" element={<Error />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
