import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_USER } from "../components/Queries";
import { Loading, ErrorMessage } from "../components/Modules";
import { AppLayout, AppHeader, AppFooter } from "../components/Modules";

const PrivatePage = ({ children }) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_USER);
  const viewer = data?.viewer;
  const shouldRedirect = !(loading || error || viewer);

  React.useEffect(() => {
    if (shouldRedirect) {
      router.push("/signin");
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

  return <div viewer={viewer}>{children}</div>;
};

export default PrivatePage;
