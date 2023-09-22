import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()} className="border-2 bg-[#912483] py-3 px-8">Log In</button>;
};

export default LoginButton;