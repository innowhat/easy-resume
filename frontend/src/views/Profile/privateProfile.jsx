import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, Avatar, Box, Typography } from "@material-ui/core";
import { ErrorMessage, Loading } from "../../components/Modules";
import UpdateAction from "./action/updateAction";
import ShareAction from "./action/shareAction";
import DeleteAction from "./action/deleteAction";
import BackAction from "./action/backAction";
import DownloadAction from "./action/downloadAction";
import SingleProfile from "./output/singleProfile";
import { GET_PROFILE } from "../../components/Queries";

const PrivateProfile = ({ profileId }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: 0,
      width: "100%",
      padding: theme.spacing(2, 0),
    },

    header: {
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    picture: {
      margin: "auto",
      width: "100px",
      height: "100px",
    },

    rightCard: {
      borderRadius: 0,
      width: "100%",
      padding: theme.spacing(5),
    },

    leftCard: {
      borderRadius: 0,
      width: "100%",
      padding: theme.spacing(5),
      color: "#fff",
      background: "grey",
    },
  }));
  const router = useRouter();
  const componentRef = React.useRef();

  //Functions
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { profileId: profileId },
  });
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  const profile = data.profile;

  return (
    <React.Fragment>
      <Box>
        {router.pathname === `/profile/view/[profileId]` && (
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  variant="rounded"
                  aria-label="profile list"
                  style={{ background: profile.settings.themeColor }}
                >
                  {""}
                </Avatar>
              }
              title={
                <Typography variant="subtitle1">
                  {profile.settings.themeTitle}
                </Typography>
              }
              subheader={
                <Typography variant="caption">{`updated at: ${profile.updatedAt}`}</Typography>
              }
              action={
                <Box>
                  <BackAction />
                  <DeleteAction profileId={profileId} />
                  <UpdateAction profileId={profileId} />
                </Box>
              }
            />
          </Card>
        )}
      </Box>
      <Box
        padding={2}
        textAlign="right"
        display="flex"
        justifyContent="flex-end"
      >
        <ShareAction profileId={profileId} />
        <Box m={1} />
        <DownloadAction componentRef={componentRef} />
      </Box>
      <Box ref={componentRef}>
        <SingleProfile profile={profile} />
      </Box>
    </React.Fragment>
  );
};

export default PrivateProfile;
