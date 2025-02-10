export {}; // This ensures TypeScript treats this file as a module

declare global {
  interface Window {
    recaptchaVerifier?: import("firebase/auth").RecaptchaVerifier;
  }
}
