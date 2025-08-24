import React from "react";
import AuthForm from "../../Components/AuthForm";

const PharmacyAuth = () => (
  <AuthForm
    title="MediLocate – Pharmacy Portal"
    subtitle="Login / Signup as a Pharmacy"
    signupFields={[{ label: "Pharmacy Name", name: "pharmacyName" }]}
    apiEndpoints={{
      login: "http://localhost:5000/auth/pharmacy/login",
      signup: "http://localhost:5000/auth/pharmacy/register",
    }}
    redirect="/pharmacy/home"
    switchText="Are you a user?"
    switchLink="/user-auth"
  />
);

export default PharmacyAuth;