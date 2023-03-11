import { Magic } from "magic-sdk";
import { OpenIdExtension } from "@magic-ext/oidc";

export const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
  extensions: [new OpenIdExtension()],
});
