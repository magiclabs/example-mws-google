import googleOneTap from "google-one-tap";

export const google = googleOneTap({
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
});
