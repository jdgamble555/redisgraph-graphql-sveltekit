import { SvelteKitAuth } from "@auth/sveltekit";
import GoogleProvider from "@auth/core/providers/google";
import { AUTH_SECRET, GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private";
import type { Profile } from "@auth/core/types";
import type { Provider } from "@auth/core/providers";
import type { Handle } from "@sveltejs/kit";

export const handle = SvelteKitAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET
    }) as Provider<Profile>
  ],
  trustHost: true,
  secret: AUTH_SECRET
}) satisfies Handle;

