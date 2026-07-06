import { Link, useNavigate } from "react-router-dom";
import { useAppContext, ACTIONS } from "../context/AppContext";
import "./Header.css";

export default function Header() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch({ type: ACTIONS.LOGOUT });
    navigate("/");
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">FitTrack</span>
        </Link>

        <nav className="nav">
          {state.currentUser ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/progress" className="nav-link">Progress</Link>
              <Link to="/history" className="nav-link">History</Link>
              <Link to="/addWorkout" className="nav-link nav-link--cta">
                + Add Workout
              </Link>
              <button className="nav-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link nav-link--cta">
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
