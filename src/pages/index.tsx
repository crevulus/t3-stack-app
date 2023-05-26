import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";
import Head from "next/head";
import { CreatePostWizard } from "~/components/CreatePostWizard";
import { Post } from "~/components/Post";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery(); // runs on user's device

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  async function signInWithGitHub() {
    await supabaseClient.auth.signInWithOAuth({
      provider: "github",
    });
  }

  async function signOut() {
    await supabaseClient.auth.signOut();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 bg-red-200 md:max-w-2xl">
          <button
            className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
            onClick={!!user ? signOut : signInWithGitHub}
          >
            {!!user ? "Sign Out" : "Sign In With Github"}
          </button>

          {!!user ? <CreatePostWizard /> : null}
          <div className=" flex flex-col">
            {data?.map((item) => (
              <Post item={item} key={item.post.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
