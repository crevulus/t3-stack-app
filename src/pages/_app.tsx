import { type AppType } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  type Session,
} from "@supabase/auth-helpers-react";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const supabaseClient = createBrowserSupabaseClient();

const MyApp: AppType<{
  initialSession: Session;
}> = ({ Component, pageProps }) => {
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
};

export default api.withTRPC(MyApp);
