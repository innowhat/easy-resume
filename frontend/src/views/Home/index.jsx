import { makeStyles } from "@material-ui/core/styles";
import { HeroLayout, CustomButton } from "../../components/Modules";
import { Typography, Button } from "@material-ui/core";
const backgroundImage = "";

const WelcomeView = (props) => {
  const useStyles = makeStyles((theme) => ({
    background: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundColor: theme.palette.primary.light, // Average color of the background image.
      backgroundPosition: "center",
    },
    button: {
      minWidth: 200,
    },

    h2: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
      },
    },

    h5: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(10),
      },
    },
    more: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  return (
    <HeroLayout backgroundClassName={classes.background}>
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        className={classes.h2}
      >
        WELCOME TO EASY RESUME
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Making a resume is now as easy as One Two Three
      </Typography>
      <CustomButton
        variant="contained"
        size="large"
        color="secondary"
        className={classes.button}
        href="/signup"
      >
        Sign me up!
      </CustomButton>
    </HeroLayout>
  );
};

export default WelcomeView;
