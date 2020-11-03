import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardView from "../views/Dashboard";
import {
  Loading,
  AppLayout,
  AppHeader,
  AppFooter,
  ErrorMessage,
} from "../components/Modules";
import { GET_USER } from "../components/Queries";

const Index = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_USER);
  const viewer = data?.viewer;
  const shouldRedirect = !(loading || error || viewer);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect]);

  if (error) {
    return (
      <React.Fragment>
        <AppHeader />
        <AppLayout>
          <ErrorMessage error={error} />
        </AppLayout>
      </React.Fragment>
    );
  }

  if (viewer) {
    return (
      <React.Fragment>
        <AppHeader />
        <AppLayout title="Dashboard">
          <DashboardView />
        </AppLayout>
        <AppFooter />
      </React.Fragment>
    );
  }
  //return <React.Fragment />;
  return <Loading />;
};

export default Index;
