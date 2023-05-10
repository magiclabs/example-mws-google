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
        console.log("DID Token:", did);
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
      // google.accounts.id.initialize({
      //   client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      //   callback: handleResponse,
      // });
      const token = {
        credential: {
          iss: "https://accounts.google.com",
          nbf: 1680552233,
          aud: "371892832861-v0ip6hnmf5auim0ih8ul07c5e24njm75.apps.googleusercontent.com",
          sub: "103652339078345098862",
          hd: "magic.link",
          email: "angel@magic.link",
          email_verified: true,
          azp: "371892832861-v0ip6hnmf5auim0ih8ul07c5e24njm75.apps.googleusercontent.com",
          name: "Angel Hernandez",
          picture:
            "https://lh3.googleusercontent.com/a/AGNmyxat829A_P3pKfR4EM_8ceABw77L3rnh1_sPgd1U=s96-c",
          given_name: "Angel",
          family_name: "Hernandez",
          iat: 1680552533,
          exp: 1680556133,
          jti: "2cd400ff3f9948e5a0982e28527236db264162ed",
          wallet: {
            issuer: "did:ethr:0xB9A8a7cD23C410cE66f21368a375E3B405e91264",
            publicAddress: "0xb9a8a7cd23c410ce66f21368a375e3b405e91264",
            email: null,
            isMfaEnabled: false,
            phoneNumber: null,
          },
        },
      };

      handleResponse(token);
      // google.accounts.id.prompt((notification) => {
      //   if (notification.isNotDisplayed()) {
      //     console.log(
      //       "%c Google notification not displayed for reason:",
      //       "color: orange; font-weight: bold;",
      //       notification.getNotDisplayedReason()
      //     );

      //     setDisabled(false);

      //     throw new Error("Try clearing cookies and then login again.");
      //   }

      //   if (notification.isSkippedMoment()) {
      //     console.log(
      //       "%c Google notification skipped for reason:",
      //       "color: orange; font-weight: bold;",
      //       notification.getSkippedReason()
      //     );

      //     setDisabled(false);

      //     throw new Error("Try clearing cookies and then login again.");
      //   }

      //   if (notification.isDismissedMoment()) {
      //     console.log(
      //       "%c Google notification dismissed for reason:",
      //       "color: orange; font-weight: bold;",
      //       notification.getDismissedReason()
      //     );

      //     setDisabled(false);
      //   }

      //   if (notification.isDisplayed()) {
      //     console.log(
      //       "%c Google notification displayed with moment type:",
      //       "color: orange; font-weight: bold;",
      //       notification.getMomentType()
      //     );

      //     console.log("is display moment:", notification.isDisplayMoment());
      //   }
      // });
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
