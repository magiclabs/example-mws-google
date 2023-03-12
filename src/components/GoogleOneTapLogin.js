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

    // initiate Google login on load
    handleGoogleLogin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } catch (error) {
      console.error(error);
    }
  }

  async function handleResponse(response) {
    const token = response.credential;

    try {
      handleMagicLogin(token);
    } catch (err) {
      console.error(err);
    }
  }

  function handleGoogleLogin() {
    setDisabled(true);

    try {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });

      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.log(
            "%c Google notification not displayed for reason:",
            "color: orange; font-weight: bold;",
            notification.getNotDisplayedReason()
          );

          setDisabled(false);

          throw new Error("Try clearing cookies and then login again.");
        }

        if (notification.isSkippedMoment()) {
          console.log(
            "%c Google notification skipped for reason:",
            "color: orange; font-weight: bold;",
            notification.getSkippedReason()
          );

          setDisabled(false);

          throw new Error("Try clearing cookies and then login again.");
        }

        if (notification.isDismissedMoment()) {
          console.log(
            "%c Google notification dismissed for reason:",
            "color: orange; font-weight: bold;",
            notification.getDismissedReason()
          );

          setDisabled(false);
        }

        if (notification.isDisplayed()) {
          console.log(
            "%c Google notification displayed with moment type:",
            "color: orange; font-weight: bold;",
            notification.getMomentType()
          );

          console.log("is display moment:", notification.isDisplayMoment());
        }
      });
    } catch (error) {
      setUser();
      console.error(error);
    }
  }

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
