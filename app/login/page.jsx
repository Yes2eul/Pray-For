"use client";

import LoginForm from "@/components/loginForm";
import React, { useState } from "react";

const Login = () => {
  const [error, setError] = useState("");

  const handleLogin = async (loginInputs) => {
    try {
      const { email, password } = loginInputs;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <LoginForm handleLogin={handleLogin} error={error} />
    </div>
  );
};

export default Login;
