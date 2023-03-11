import React, { useContext, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import GoogleOneTapLogin from "./GoogleOneTapLogin";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (user && user.iss) {
      navigate("/profile");
    } else if (storedUser) {
      setUser(storedUser);
      navigate("/profile");
    }
  }, [user, setUser, navigate]);

  return (
    <div id="home">
      <h1>Homepage</h1>
      <div>This is the demo homepage. Please login with Google below.</div>
      <GoogleOneTapLogin />
    </div>
  );
}
