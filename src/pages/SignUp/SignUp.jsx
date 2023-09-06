import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AllRoutes } from "../../utils/RouteConstants";
import { postSignUp, signupStore } from "./redux/SignupSlice";
import Loader from "../../components/Loader/Loader";
import EyeLock from "../../assets/images/EyeLock.png";
import EyeOpen from "../../assets/images/EyeOpen.png";
import "./SignUp.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const { isLoading, isSignUpSuccess, isSignUpError } =
    useSelector(signupStore);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    carNumber: "",
    file: {
      selectedFile: null,
      base64String: "",
    },
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    name: "",
    password: "",
    carNumber: "",
    file: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    name: false,
    password: false,
    carNumber: false,
    file: false,
  });

  useEffect(() => {
    if (isSignUpSuccess) {
      navigate(AllRoutes.LOGIN);
    }
  }, [isSignUpSuccess]);

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate(AllRoutes.LOGIN);
  };

  const validateEmail = (event) => {
    if (!event.target.value) return "Email is required.";
    return "";
  };

  const validateUsername = (event) => {
    if (!event.target.value) return "Name is required.";
    return "";
  };

  const validatePassword = (event) => {
    if (!event.target.value) return "Password is required.";
    return "";
  };

  const validateCarNumber = (event) => {
    if (!event.target.value) return "Car Number is required.";
    return "";
  };

  const validateFile = (event) => {
    if (
      !(
        (event.target.files && event.target.files[0]) ||
        event.target.value.base64String
      )
    )
      return "File is required.";
    return "";
  };

  const validateField = (fieldName, event) => {
    switch (fieldName) {
      case "email":
        return validateEmail(event);
      case "name":
        return validateUsername(event);
      case "password":
        return validatePassword(event);
      case "carNumber":
        return validateCarNumber(event);
      case "file":
        return validateFile(event);
      default:
        return "";
    }
  };

  const handleFileChange = async (fieldName, value) => {
    let formData = {};
    const file = value.target.files && value.target.files[0];

    if (file) {
      const reader = new FileReader();

      const readPromise = new Promise((resolve) => {
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            resolve(e.target.result);
          }
        };
      });

      reader.readAsDataURL(file);

      const base64String = await readPromise;

      formData = {
        [fieldName]: {
          selectedFile: file,
          base64String: base64String,
        },
      };
    } else {
      formData = {
        [fieldName]: { selectedFile: null, base64String: "" },
      };
    }

    return formData;
  };

  const handleFieldChange = async (fieldName, event) => {
    let updatedFormData = { ...formData, [fieldName]: event.target.value };
    if (fieldName === "file") {
      let fileFormData = await handleFileChange(fieldName, event);
      updatedFormData = { ...formData, ...fileFormData };
    }
    setFormData(updatedFormData);

    if (touchedFields[fieldName]) {
      const errorMessage = validateField(fieldName, event);
      setValidationErrors({ ...validationErrors, [fieldName]: errorMessage });
    }
  };

  const handleFieldBlur = (fieldName) => {
    if (fieldName === "file") {
      return;
    }
    setTouchedFields({ ...touchedFields, [fieldName]: true });
    const value = formData[fieldName];
    const errorMessage = validateField(fieldName, { target: { value } });
    setValidationErrors({ ...validationErrors, [fieldName]: errorMessage });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiBody = {
      name: formData.name,
      email: formData.email,
      contactNumber: 0,
      password: formData.password,
      carNumber: formData.carNumber,
      imageS3Link: "string",
    };

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
      dispatch(postSignUp(apiBody));
    }
  };

  const togglePassword = () => {
    setHidePassword((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="SignUp_container main_background">
      <div className="SignUp_card">
        <div className="SignUp_sign_up" onClick={handleSignIn}>
          <p className="Sign_up_paragraph">Have an Account ?</p>
          <p className="Sign_up_paragraph">Sign in</p>
        </div>
        <div className="SignUp_welcome_title">
          Welcome to <span className="SignUp_welcome_title_green">ParkNow</span>
        </div>
        <div className="SignUp_sign_in">Sign up</div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="SignUp_field">
              <div className="SignUp_label">Enter your email address</div>
              <input
                className="SignUp_input"
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e)}
                onBlur={() => handleFieldBlur("email")}
              />
              {validationErrors.email && (
                <div className="invalid-feedback">{validationErrors.email}</div>
              )}
            </div>
            <div className="SignUp_field">
              <div className="SignUp_label">Enter your Name</div>
              <input
                className="SignUp_input"
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e)}
                onBlur={() => handleFieldBlur("name")}
              />
              {validationErrors.name && (
                <div className="invalid-feedback">{validationErrors.name}</div>
              )}
            </div>
            <div className="SignUp_field">
              <div className="SignUp_label">Enter your Password</div>
              <div className="Password_wrapper">
                <input
                  className="SignUp_input"
                  type={hidePassword ? "password" : "text"}
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
            <div className="SignUp_field">
              <div className="SignUp_label">Enter your Car Number</div>
              <input
                className="SignUp_input"
                value={formData.carNumber}
                onChange={(e) => handleFieldChange("carNumber", e)}
                onBlur={() => handleFieldBlur("carNumber")}
              />
              {validationErrors.carNumber && (
                <div className="invalid-feedback">
                  {validationErrors.carNumber}
                </div>
              )}
            </div>
            <div className="SignUp_field">
              <div className="SignUp_label">Upload Your Picture</div>
              <input
                className="form-control form-control-lg"
                type="file"
                id="formFile"
                accept="image/*"
                onChange={(e) => handleFieldChange("file", e)}
                onBlur={() => handleFieldBlur("file")}
              />
              {validationErrors.file && (
                <div className="invalid-feedback">{validationErrors.file}</div>
              )}
            </div>
            <div className="SignUp_button_wrapper">
              <button type="submit" className="SignUp_button">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default SignUp;
