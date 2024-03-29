import "./Homepage.css";
import userContext from "./userContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

/**Landing page for Jobly.
 *
 * Props: none
 *
 * State: none
 *
 * Consumes Context: userContext
 *
 *App -> Homepage
 */
function Homepage() {
  const currUser = useContext(userContext);

  return (
    <div className="Homepage whiteWithShadow">
      <h1>Jobly</h1>
      <h3>All the jobs, all in one place.</h3>
      {currUser ? (
        <h4>Welcome back, {currUser.username}!</h4>
      ) : (
        <>
          <div>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Homepage;
