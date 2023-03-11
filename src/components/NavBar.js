import React from "react";
import logo from "../img/logo.png";

export default function NavBar() {
  return (
    <header>
      <div id="appName">
        <img id="logo" src={logo} alt="logo" />
        MWS + Google One Tap Demo
      </div>
    </header>
  );
}
