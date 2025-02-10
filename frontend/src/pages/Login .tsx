import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  }, []);

  const sendOTP = async () => {
    try {
      const appVerifier = window.recaptchaVerifier as RecaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert("OTP sent successfully!");
      console.log("OTP sent!"); // Log OTP sent message
      console.log("Confirmation Result:", result); // Log the confirmation result
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult) return;
    try {
      const credential = await confirmationResult.confirm(verificationCode);
      alert(`User signed in: ${credential.user.phoneNumber}`);
      navigate("/home");
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      <h2>Login with Phone</h2>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendOTP}>Send OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={verifyOTP}>Verify OTP</button>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
