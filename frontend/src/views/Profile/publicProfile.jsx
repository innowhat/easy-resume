import { useQuery } from "@apollo/client";
import { Box } from "@material-ui/core";
import { ErrorMessage, Loading } from "../../components/Modules";
import DownloadAction from "./action/downloadAction";
import SingleProfile from "./output/singleProfile";
import { GET_PUBLIC_PROFILE } from "../../components/Queries";

const PublicProfile = ({ profileId }) => {
  const componentRef = React.useRef();
  const { loading, error, data } = useQuery(GET_PUBLIC_PROFILE, {
    variables: { profileId: profileId },
  });
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  const profile = data.publicProfile;

  return (
    <React.Fragment>
      <Box padding={2} textAlign="right">
        <DownloadAction componentRef={componentRef} />
      </Box>
      <Box ref={componentRef}>
        <SingleProfile profile={profile} />
      </Box>
    </React.Fragment>
  );
};

export default PublicProfile;
