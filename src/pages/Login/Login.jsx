import { useNavigate } from "react-router";
import React, { useState } from "react";
import { AllRoutes } from "../../utils/RouteConstants";
import { postLogin } from "./redux/LoginSlice";
import "./Login.css";
import { ServiceCalls, setHeaders } from "../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../utils/BackendRoutes";

const Login = () => {
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
    navigate(AllRoutes.SIGN_UP);
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
    console.log("hello")
    const headers = setHeaders();
    const accessToken = localStorage.getItem("access_token");
    Object.assign(headers.headers, {
      Authorization: `Bearer ${accessToken}`,
    });
    const body = {
      email: "cm@gmail.com",
      password: "blabla",
    };
    const response = ServiceCalls.post(BACKEND_ROUTES.LOGIN, body, headers);
    console.log("responser fasdfas",response)
    // postLogin();
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
      localStorage.setItem("access_token", "REPLACE_WITH_REAL_TOKEN");
      navigate(AllRoutes.HOME);
    }
  };

  return (
    <div className="Login_container main_background">
      <div className="Login_card">
        <div className="Login_sign_up" onClick={handleSignUp}>
          No Account ?<br /> Sign up
        </div>
        <div className="Login_welcome_title">
          Welcome to <span className="Login_welcome_title_green">ParkNow</span>
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
};

export default Login;
