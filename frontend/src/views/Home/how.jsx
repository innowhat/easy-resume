import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Container,
  Grid,
  Avatar,
  Box,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { CustomButton } from "../../components/Modules";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  avatar: {
    fontSize: 44,
    width: 100,
    height: 100,
    background: theme.palette.secondary.dark,

    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
}));

const HowItWorks = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container className={classes.container} maxWidth="xl">
        <img
          src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography
          variant="h2"
          marked="center"
          className={classes.title}
          component="h2"
          align="center"
        >
          How it works
        </Typography>
        <Box paddingBottom={10}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <Avatar alt="register" className={classes.avatar}>
                  1
                </Avatar>

                <Typography variant="h5" align="center">
                  {" CREATE"}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <Avatar alt="profile" className={classes.avatar}>
                  2
                </Avatar>
                <Typography variant="h5" align="center">
                  {" PREVIEW"}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <Avatar alt="pdf" className={classes.avatar}>
                  3
                </Avatar>
                <Typography variant="h5" align="center">
                  {" DOWNLOAD"}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
        <CustomButton
          color="primary"
          size="large"
          variant="outlined"
          className={classes.button}
          href="/profile"
        >
          Get started
        </CustomButton>
      </Container>
    </section>
  );
};
export default HowItWorks;
