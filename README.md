# Magic Wallet Services + Google OneTap Login Demo

An example app showcasing the simplicity of the Magic Wallet Services setup with Google as the identity provider.

[Visit the deployed app here](https://) ↗

## Prerequisites

### Google One Tap

- Sign into [Google Cloud Console](https://console.cloud.google.com/)
- [Create a Project](https://console.cloud.google.com/projectcreate). Fill out the fields and click `CREATE`
- Configure OAuth
  1. **OAuth consent screen**
     - Complete the **App information** and add to **App logo** if needed.
     - In **App domain** include links to your `home page`, `privacy policy`, and `terms of service`. This will be needed for the Google verification process. If you're only testing it can be omitted.
     - Select the user type (`internal` or `external`) and click `CREATE`
     - Fill in the **App information** fields.
     - Add the authorized domains to the **Authorized domains** section, and include `magic.link`.
     - Click `SAVE AND CONTINUE`
  2. **Scopes**
     - Include the necessary scopes or just skip this section if you're simply testing MWS as it is not required.
     - Click `SAVE AND CONTINUE`
  3. **Summary**
     - Review the summary
     - Click `BACK TO DASHBOARD`
- Create Credentials
  - Click the `Credentials` link in the left side-panel in the Google cloud console with your project selected
  - Click `+ CREATE CREDENTIALS` and `OAuth client ID`
  - Select an `Application type` and give it a name
  - Enter your domain into the `Authorized Javascript Origins`
  - Click `Create`
  - You'll be presented with `Your client ID` and `Your Client Secret`. Please take note of these values. In this demo we will only use the `Client ID` and it will be required to share it with Magic during the Magic MWS Setup step

### Magic

- Create a [Magic account](https://magic.link/).
- Create a Magic Auth application and retain the `Publishable API Key`.

[Magic Web API docs](https://magic.link/docs/auth/api-reference/client-side-sdks/web)

### Magic MWS Setup

- Contact Magic and provide the Google `client ID` and Magic `Publishable API Key`.
- Magic will return a `Provider ID`, please retain this.

## Quickstart Instructions

🚨 **Before you begin:** please read the [prerequisites](#prerequisites)

Clone this repo to your local machine:

```bash
$ git clone https://github.com/
$ cd example-mws-google
$ mv .env.example .env
```

To install and set up the library, run:

```bash
$ npm install
# or
$ yarn install
```

### .env File

Insert the following values obtained in the [prerequisites](#prerequisites) section, into the `.env` file

```
REACT_APP_MAGIC_PUBLISHABLE_KEY=
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_MAGIC_PROVIDER_ID=
```

### Serving the App Locally

```bash
$ npm start
# or
$ yarn start
```

### Finally

When the browser is loaded with the app you can test functionality by clicking **`Login with Google`** to start the Google login process. You should see a login modal from Google appear onscreen. Click the continue button to sign in. You will be directed to the `profile` page where the user's name and email are populated from the Google ID token and the wallet's address is populated from **Magic**.
