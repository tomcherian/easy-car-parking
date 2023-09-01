import { useNavigate } from "react-router";
import "./SignUp.css";
import React, { useState } from "react";
import { AllRoutes } from "../../utils/RouteConstants";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    carNumber: "",
    file: {
      selectedFile: null,
      base64String: "",
    },
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    username: "",
    password: "",
    carNumber: "",
    file: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    username: false,
    password: false,
    carNumber: false,
    file: false,
  });

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate(AllRoutes.LOGIN);
  };

  const validateEmail = (event) => {
    if (!event.target.value) return "Email is required.";
    return "";
  };

  const validateUsername = (event) => {
    if (!event.target.value) return "Username is required.";
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
      case "username":
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

    // Validate the field if it's touched
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
      // Perform form submission logic
    }
  };

  return (
    <div className="SignUp_container main_background">
      <div className="SignUp_card">
        <div className="SignUp_sign_up" onClick={handleSignIn}>
          Have an Account ?<br />
          Sign in
        </div>
        <div className="SignUp_welcome_title">
          Welcome to <span className="SignUp_welcome_title_green">LOREM</span>
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
              <div className="SignUp_label">Enter your Username</div>
              <input
                className="SignUp_input"
                value={formData.username}
                onChange={(e) => handleFieldChange("username", e)}
                onBlur={() => handleFieldBlur("username")}
              />
              {validationErrors.username && (
                <div className="invalid-feedback">
                  {validationErrors.username}
                </div>
              )}
            </div>
            <div className="SignUp_field">
              <div className="SignUp_label">Enter your Password</div>
              <input
                className="SignUp_input"
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
    </div>
  );
};

export default SignUp;
