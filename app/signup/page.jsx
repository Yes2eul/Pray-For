"use client";

import SignUpForm from "@/components/signupForm";
import React, { useState } from "react";

const SingUp = () => {
  const [error, setError] = useState("");

  const handleSignUp = async (signupInputs) => {
    try {
      const { email, password } = signupInputs;
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <SignUpForm handleSignUp={handleSignUp} error={error} />
    </div>
  );
};

export default SingUp;
