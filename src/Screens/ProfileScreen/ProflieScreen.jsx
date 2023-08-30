import "./ProflieScreen.css";
import Navbar from "../HomeScreen/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";

function ProflieScreen() {
  const user = useSelector(selectUser);
  const Navigate = useNavigate();
  const goHome = () => {
    window.history.replaceState(null, "", "/");
    Navigate("/");
  };
  return (
    <div className="profileScreen">
      <Navbar />
      <div className="body">
        <h1>Edit Profile</h1>
        <div className="Info">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlxIi9VcRXindEC1M94AOqTnCaU0-16LidGg&usqp=CAU"
            alt="your avatar"
          />
          <div className="Details">
            <h2>{user.email}</h2>
            <div className="Plans">
              <h3>Plans</h3>
              <button
                className="SignOut"
                onClick={() => {
                  auth.signOut();
                  goHome();
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProflieScreen;
