import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Views
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";

import { UserContext } from "./utils/UserContext";
import Footer from "./components/Footer";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    if (!user || !user.iss) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      storedUser?.iss ? setUser(storedUser) : setUser();
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <UserContext.Provider value={[user, setUser]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </>
  );
}
