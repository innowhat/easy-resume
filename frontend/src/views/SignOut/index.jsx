import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useApolloClient } from "@apollo/client";
import { SIGNOUT_USER } from "../../components/Queries";
import { Loading } from "../../components/Modules";

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useMutation(SIGNOUT_USER);

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push("/signin");
      });
    });
  }, [signOut, router, client]);

  return <Loading>Signing out...</Loading>;
}

export default SignOut;
