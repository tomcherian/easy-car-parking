import { useNavigate } from "react-router";
import "./Login.css";
import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const validateEmail = (event) => {
    if (!event.target.value) return "Email is required.";
    return "";
  };

  const validatePassword = (event) => {
    if (!event.target.value) return "Password is required.";
    return "";
  };

  const validateField = (fieldName, event) => {
    switch (fieldName) {
      case "email":
        return validateEmail(event);
      case "password":
        return validatePassword(event);
      default:
        return "";
    }
  };

  const handleFieldChange = (fieldName, event) => {
    let updatedFormData = { ...formData, [fieldName]: event.target.value };
    setFormData(updatedFormData);

    // Validate the field if it's touched
    if (touchedFields[fieldName]) {
      const errorMessage = validateField(fieldName, event);
      setValidationErrors({ ...validationErrors, [fieldName]: errorMessage });
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields({ ...touchedFields, [fieldName]: true });
    const value = formData[fieldName];
    const errorMessage = validateField(fieldName, { target: { value } });
    setValidationErrors({ ...validationErrors, [fieldName]: errorMessage });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasErrors = false;
    const updatedValidationErrors = {};

    for (const fieldName in formData) {
      const value = formData[fieldName];

      const errorMessage = validateField(fieldName, { target: { value } });
      updatedValidationErrors[fieldName] = errorMessage;

      if (errorMessage) {
        hasErrors = true;
      }
    }

    setValidationErrors(updatedValidationErrors);

    const updatedTouched = {};
    for (const fieldName in formData) {
      updatedTouched[fieldName] = true;
    }

    setTouchedFields(updatedTouched);

    if (!hasErrors) {
      console.log({ formData });
      // Perform form submission logic
    }
  };
  return (
    <div className="Login_container">
      <div className="Login_card">
        <div className="Login_sign_up" onClick={handleSignUp}>
          No Account ?<br /> Sign up
        </div>
        <div className="Login_welcome_title">
          Welcome to <span className="Login_welcome_title_green">LOREM</span>
        </div>
        <div className="Login_sign_in">Sign in</div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="Login_field_username">
              <div className="Login_label">
                Enter your username or email address
              </div>
              <input
                className="Login_input"
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e)}
                onBlur={() => handleFieldBlur("email")}
              />
              {validationErrors.email && (
                <div className="invalid-feedback">{validationErrors.email}</div>
              )}
            </div>
            <div>
              <div className="Login_label">Enter your Password</div>
              <input
                className="Login_input"
                name="password"
                value={formData.password}
                onChange={(e) => handleFieldChange("password", e)}
                onBlur={() => handleFieldBlur("password")}
              />
              {validationErrors.password && (
                <div className="invalid-feedback">
                  {validationErrors.password}
                </div>
              )}
            </div>
            <div className="Login_forgot_password">Forgot Password</div>
            <div className="Login_button_wrapper">
              <button type="submit" className="Login_button">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
