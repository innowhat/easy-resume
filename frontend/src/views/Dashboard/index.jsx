import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Grid,
  Button,
  Avatar,
  Divider,
  Box,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import {
  Person,
  Comment,
  Visibility,
  KeyboardArrowRight,
} from "@material-ui/icons";
import { ErrorMessage, Loading } from "../../components/Modules";
import { GET_PROFILES, GET_USER } from "../../components/Queries";

const DashboardView = () => {
  const useStyles = makeStyles((theme) => ({
    header: {
      background: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  }));
  const classes = useStyles();

  const { data: dataV, error: errorV, loading: loadingV } = useQuery(GET_USER);
  const { loading, error, data } = useQuery(GET_PROFILES);
  if (error || errorV) return <ErrorMessage error={error} />;
  if (loading || loadingV)
    return (
      <Box paddingTop={20}>
        <Loading />
      </Box>
    );

  const profiles = data.profiles;

  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              className={classes.header}
              title={<Typography variant="h6">ACTIVITY FEED</Typography>}
            />

            {data.profiles.length > 0 && (
              <CardContent>
                {data.profiles.map((profile, index) => {
                  return (
                    <div className={classes.root} key={index}>
                      <List component="nav">
                        <Link
                          href="/profile/view/[profileId]"
                          as={`/profile/view/${profile.id}`}
                        >
                          <ListItem button>
                            <ListItemAvatar>
                              <Avatar
                                variant="rounded"
                                style={{
                                  background: profile.settings.themeColor,
                                }}
                              >
                                {""}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="caption">
                                  {"Title"}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="subtitle1">
                                  {profile.settings.themeTitle}
                                </Typography>
                              }
                            />
                            <ListItemIcon>
                              <KeyboardArrowRight />
                            </ListItemIcon>
                          </ListItem>
                        </Link>
                      </List>
                      <Divider variant="fullWidth" />
                    </div>
                  );
                })}
              </CardContent>
            )}

            {data.profiles.length == 0 && (
              <CardContent>
                <Typography align="center" variant="subtitle1">
                  No activity yet
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              className={classes.header}
              title={
                <Typography variant="h3" color="initial">
                  Welcome!
                </Typography>
              }
              subheader={
                <Typography variant="h5" color="secondary">
                  {`${dataV.viewer.firstName} ${dataV.viewer.lastName}`}
                </Typography>
              }
            />
            {/* 
            <CardContent>
              <List component="nav">
                <Link href="/account">
                  <ListItem button>
                    <ListItemText
                      primary={
                        <Typography variant="button" color="secondary">
                          Account
                        </Typography>
                      }
                    />
                    <ListItemIcon>
                      <Visibility />
                    </ListItemIcon>
                  </ListItem>
                </Link>
                <Divider variant="fullWidth" />
                <Link href="/profile">
                  <ListItem button>
                    <ListItemText
                      primary={
                        <Typography variant="button" color="secondary">
                          Profile
                        </Typography>
                      }
                    />
                    <ListItemIcon>
                      <Visibility />
                    </ListItemIcon>
                  </ListItem>
                </Link>
              </List>
            </CardContent>
            <Divider variant="fullWidth" /> */}

            <CardContent>
              <List className={classes.root}>
                <ListItem>
                  <ListItemText
                    primary="Account was created on:"
                    secondary={
                      <Typography variant="caption" color="secondary">
                        {dataV.viewer.createdAt}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="fullWidth" />
                <ListItem>
                  <ListItemText
                    primary="Account last update:"
                    secondary={
                      <Typography variant="caption" color="secondary">
                        {dataV.viewer.updatedAt}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="fullWidth" />
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DashboardView;
