import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Paper,
  CardHeader,
  Box,
  CardContent,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, Loading, CustomButton } from "../../components/Modules";
import { GET_PROFILES } from "../../components/Queries";
import ListProfile from "./output/listProfile";
import React from "react";
import AddProfile from "./input/AddProfile";

const Profiles = () => {
  const useStyles = makeStyles((theme) => ({
    header: {
      background: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_PROFILES);
  if (error) return <ErrorMessage error={error} />;
  if (loading)
    return (
      <Box paddingTop={20}>
        <Loading />
      </Box>
    );
  return (
    <React.Fragment>
      <Card>
        <CardHeader
          className={classes.header}
          title={<Typography variant="h5">PROFILE LIST</Typography>}
        />
        <CardContent>
          <Box textAlign="center">
            <AddProfile />
          </Box>
        </CardContent>
      </Card>
      {data.profiles.length > 0 && (
        <Paper className={classes.root}>
          {data.profiles.map((profile, index) => {
            return (
              <div key={index}>
                <ListProfile profile={profile} />
              </div>
            );
          })}
        </Paper>
      )}

      {data.profiles.length == 0 && (
        <Paper className={classes.root}>
          <Typography align="center" variant="subtitle1">
            You have not created any profile yet
          </Typography>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Profiles;
