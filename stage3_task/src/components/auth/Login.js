import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()} className="border border-orange-900 py-3 px-8">Log In</button>;
};

export default LoginButton;