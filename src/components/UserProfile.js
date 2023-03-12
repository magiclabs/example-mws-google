import React, { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";

export default function User() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser();
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div id="user">
      {user?.iss && (
        <div id="userProfile">
          <h1>
            Hello {user.given_name} {user.family_name}!
          </h1>
          <div className="userImageWrapper">
            <img
              src={user.picture || logo}
              alt={`${user.given_name}'s avatar`}
            />
          </div>
          <div className="label">Email</div>
          <div className="profile-info">{user.email}</div>
          {user.wallet && (
            <>
              <div className="label">Address</div>
              <div className="profile-info">{user.wallet.publicAddress}</div>
            </>
          )}
        </div>
      )}
      <button className="purple-btn logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
