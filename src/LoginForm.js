import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";
import JoblyApi from "./api";
import Alerts from "./Alerts";

/**Form for logging in to Jobly App.
 *
 * Props: Login (fn)
 *
 * State: formData, errors
 *
 * Consumes Context: None
 *
 * App -> RouteList -> LoginForm
 */
function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  /**Updates state based on form input change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  }

  /**Handles form submission. Redirects to home on success, renders error
   * alerts with invalid credentials.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <>
      <h1 className="whiteWithShadow">Login</h1>
      <form onSubmit={handleSubmit} className="UserForm">
        <label htmlFor="username" className="UserForm-label">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="UserForm-input"
          required
        />
        <label htmlFor="password" className="UserForm-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          className="UserForm-input"
          required
        />
        {errors.length > 0 && <Alerts errors={errors} />}
        <button className="UserForm-button">Submit</button>
      </form>
    </>
  );
}

export default LoginForm;
