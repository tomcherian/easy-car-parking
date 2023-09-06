import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AllRoutes } from "../../utils/RouteConstants";
import { loginStore, postLogin } from "./redux/LoginSlice";
import EyeLock from "../../assets/images/EyeLock.png";
import EyeOpen from "../../assets/images/EyeOpen.png";
import Loader from "../../components/Loader/Loader";
import ParkBackground from "../../assets/images/ParkingBackground.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, isLoginError } = useSelector(loginStore);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate(AllRoutes.HOME);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoginError) {
      toast.error("Login error! Please try again", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  }, [isLoginError]);

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
      dispatch(postLogin(formData));
    }
  };

  const togglePassword = () => {
    setHidePassword((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="Login_container main_background">
      {isLoading && <Loader />}
      <img src={ParkBackground} alt="park background" className="Park_background"/>
      <div className="Login_card">
        <div className="Login_sign_up" onClick={handleSignUp}>
          <p className="Login_sign_up_paragraph">No Account ?</p><p className="Login_sign_up_paragraph">Sign up</p>
        </div>
        <div className="Login_welcome_title">
          Welcome to <span className="Login_welcome_title_green">ParkNow</span>
        </div>
        <div className="Login_sign_in">Sign in</div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="Login_field_username">
              <div className="Login_label">Enter your email address</div>
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
              <div className="Password_wrapper">
                <input
                  className="Login_input"
                  type={hidePassword ? "password" : "text"}
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleFieldChange("password", e)}
                  onBlur={() => handleFieldBlur("password")}
                />
                {hidePassword && (
                  <img
                    className="Eye_lock"
                    src={EyeLock}
                    alt="Eye lock"
                    height={40}
                    width={40}
                    onClick={togglePassword}
                  />
                )}
                {!hidePassword && (
                  <img
                    className="Eye_lock"
                    src={EyeOpen}
                    alt="Eye lock"
                    height={40}
                    width={40}
                    onClick={togglePassword}
                  />
                )}
              </div>
              {validationErrors.password && (
                <div className="invalid-feedback">
                  {validationErrors.password}
                </div>
              )}
            </div>
            <div className="Login_button_wrapper">
              <button type="submit" className="Login_button btn btn-primary">
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
