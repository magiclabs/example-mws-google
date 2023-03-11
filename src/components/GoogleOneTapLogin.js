/*global google*/
import React, { useContext, useEffect, useState } from "react";
import { parseJWT } from "../utils/parseJWT";
import { UserContext } from "../utils/UserContext";
import { magic } from "../utils/magic";

export default function GoogleOneTapLogin() {
  const [, setUser] = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // preloading Magic assets before logging in
    magic.preload();
  }, []);

  async function handleMagicLogin(userToken) {
    try {
      const did = await magic.openid.loginWithOIDC({
        jwt: userToken,
        providerId: process.env.REACT_APP_MAGIC_PROVIDER_ID,
      });

      if (did) {
        const magicUser = await magic.user.getMetadata();

        // parse info from id token
        const userInfo = parseJWT(userToken);

        // add magic wallet to user info
        userInfo.wallet = magicUser;
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleResponse = async (response) => {
    const token = response.credential;

    handleMagicLogin(token);
  };

  const handleGoogleLogin = () => {
    setDisabled(true);
    setUser({ isLoading: true });
    try {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error("Try clearing cookies and then login again.");
        }

        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          console.log("notification skipped or dismissed");
          setDisabled(false);
        }
      });
    } catch (error) {
      setUser();
      console.error(error);
    }

    google.accounts.id.prompt();
  };

  return (
    <div className="oneTapContainer">
      <button
        className="purple-btn"
        disabled={disabled}
        onClick={handleGoogleLogin}
      >
        <strong>Login with Google</strong>
      </button>
    </div>
  );
}
