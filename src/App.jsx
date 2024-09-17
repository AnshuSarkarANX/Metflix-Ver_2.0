/* eslint-disable no-unreachable */
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
//components
import "./App.css";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import LoadingScreen from "./Screens/LoginScreen/LoadingScreen.jsx";
import HomeScreen from "./Screens/HomeScreen/Homescreen.jsx";
import LoginScreen from "./Screens/LoginScreen/LoginScreen.jsx";
import ProfileScreen from "./Screens/ProfileScreen/ProflieScreen.jsx";
import TrailerScreen from "./Screens/HomeScreen/TrailerFeature/trailerScreen";
import Error from "./ErrorPage.jsx";

function App() {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const handleSearch=(term)=>{
  <SearchResults term={term}/>
  console.log(term);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        //logged in
        dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
      }
      //logged out
      else {dispatch(logout());}
          setLoading(false);
    });

    return unsubscribe; 
  }, [dispatch]);
  return (

      <BrowserRouter>
        { loading?
          <LoadingScreen /> 
          :!user ? 
          <LoginScreen />
        : 
          <Routes>
            <Route exact path="/" Component={HomeScreen}/>
            <Route path="/profilescreen" Component={ProfileScreen}/>
            <Route path= "/trailerScreen" Component={TrailerScreen}/>
            <Route path="*" element={<Error />} />
          </Routes>
        }
      </BrowserRouter>

  );
}

export default App;
