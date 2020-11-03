import Link from "next/link";
import Head from "next/head";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../Queries";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";

import {
  AppBar,
  Container,
  Button,
  Toolbar,
  Box,
  Paper,
  IconButton,
  Link as MuiLink,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  error: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  link: {
    cursor: "pointer",
  },
  back: {
    cursor: "pointer",
  },
  themeSwitch: {
    position: "fixed",
    bottom: "8px",
    right: "16px",
  },
  taskbar: {},
  switch: {
    alignItems: "flex-end",
  },
  customButton: {
    margin: theme.spacing(1),
  },
}));

// Error display
export const ErrorMessage = ({ error }) => {
  const classes = useStyles();

  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div className={classes.error} key={i}>
        <Container>
          <Alert variant="outlined" severity="error">
            <span data-test="graphql-error">
              <strong>Error</strong> <br />
              {error.message.replace("GraphQL error: ", "")}
            </span>
          </Alert>
        </Container>
      </div>
    ));
  }
  return (
    <div className={classes.error}>
      <Container>
        <Alert variant="outlined" severity="error">
          <p data-test="graphql-error">
            <strong>Error</strong>
            <br />
            {error.message.replace("GraphQL error: ", "")}
          </p>
        </Alert>
      </Container>
    </div>
  );
};

//Form error
export const FormErrorMessage = (error) => {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === "BAD_USER_INPUT"
      ) {
        return graphQLError.message;
      }
    }
  }
  return error.message;
};

// Loading display
export const Loading = ({ children }) => {
  const classes = useStyles();

  return (
    <Container align="center" className={classes.loading}>
      <Box paddingTop={20} paddingBottom={20}>
        <CircularProgress disableShrink color="secondary" size={70} />
        <Typography align="center" variant="h2">
          {children}
        </Typography>
      </Box>
    </Container>
  );
};

// Progress display
export const ProgressIndicator = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

// Custom Links
export const CustomLink = ({
  href,
  children,
  variant,
  color = "inherit",
  passHref,
}) => {
  const classes = useStyles();
  return (
    <Link href={href} passHref={passHref}>
      <MuiLink
        variant={variant}
        underline="none"
        component={"a"}
        color={color}
        className={classes.link}
      >
        {children}
      </MuiLink>
    </Link>
  );
};

//Link Button
export const CustomButton = ({
  children,
  href,
  as,
  variant,
  color,
  size,
  disabled,
}) => {
  const classes = useStyles();

  return (
    <Link href={href} as={as}>
      <Button variant={variant} color={color} size={size} disabled={disabled}>
        {children}
      </Button>
    </Link>
  );
};

//TaskBar
export const Taskbar = ({ children, title = "Update", variant = "h4" }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

    title: {
      flexGrow: 1,
      alignSelf: "flex-end",
    },
  }));
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Typography className={classes.menuButton} color="inherit">
          {title}
        </Typography>
        <Typography className={classes.title} />
        <Typography>{children}</Typography>
      </Toolbar>
    </AppBar>
  );
};

//App Layout
export const AppLayout = ({
  children,
  title = "Easy resume",
  maxWidth = "lg",
}) => {
  const useStyles = makeStyles((theme) => ({
    layout: {
      minHeight: "80vh",
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
    },
    content: {
      paddingTop: theme.spacing(3),
    },
  }));
  const classes = useStyles();

  return (
    <Container className={classes.layout} maxWidth={maxWidth}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className={classes.content}>{children}</main>
    </Container>
  );
};

// Hero Layout
export const HeroLayout = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.common.white,
      position: "relative",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        height: "80vh",
        minHeight: 500,
        maxHeight: 1300,
      },
    },
    container: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(14),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    backdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.primary.main,
      //opacity: 0.5,
      zIndex: -1,
    },
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      zIndex: -2,
    },
    arrowDown: {
      position: "absolute",
      bottom: theme.spacing(4),
    },
  }));
  const classes = useStyles();
  const { backgroundClassName, children } = props;
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
        <div className={classes.backdrop} />
        <div className={clsx(classes.background, backgroundClassName)} />

        <IconButton
          className={classes.arrowDown}
          color="secondary"
        ></IconButton>
      </Container>
    </section>
  );
};

// Form Layout
export const FormLayout = ({ children }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    paper: {
      padding: theme.spacing(4, 3),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(8, 6),
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Box mt={7} mb={12}>
          <Paper className={classes.paper}>{children}</Paper>
        </Box>
      </Container>
    </div>
  );
};

// Page Navigation
export const PageNavBar = ({ children }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },

    title: {
      flexGrow: 1,
      alignSelf: "flex-end",
    },
  }));

  const classes = useStyles();

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          size="medium"
          color="inherit"
          aria-label="menu"
          href="/"
        >
          <HomeIcon />
        </IconButton>
        <Typography className={classes.title} />
        <Typography>
          <CustomButton href="/profile" color="inherit">
            Profile
          </CustomButton>
          <CustomButton href="/account" color="inherit">
            Account
          </CustomButton>
        </Typography>
      </Toolbar>

      <Box padding={1}>{children}</Box>
    </AppBar>
  );
};

//App Header
export const AppHeader = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logo: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  }));
  const classes = useStyles();
  const { data } = useQuery(GET_USER);
  const viewer = data?.viewer;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" variant="elevation" elevation={0}>
        <Container>
          <Toolbar disableGutters>
            <CustomLink href="/" color="inherit">
              <Typography className={classes.logo}>{"EASY RESUME"}</Typography>
            </CustomLink>
            <Typography className={classes.title} />
            <div>
              {viewer ? (
                <React.Fragment>
                  <CustomButton
                    style={{ color: "#00bbd4" }}
                    href="/profile"
                    variant="text"
                    color="secondary"
                    size="small"
                  >
                    Profile
                  </CustomButton>
                  <CustomButton
                    href="/account"
                    variant="text"
                    color="secondary"
                    size="small"
                  >
                    Account
                  </CustomButton>
                  <Button
                    href="/signout"
                    variant="outlined"
                    color="inherit"
                    size="small"
                    style={{ marginLeft: "20px" }}
                  >
                    Sign Out
                  </Button>
                </React.Fragment>
              ) : (
                <div>
                  <CustomButton variant="text" href="/signup" color="inherit">
                    {"Sign up"}
                  </CustomButton>
                  <CustomButton
                    href="/signin"
                    variant="outlined"
                    color="inherit"
                  >
                    {"Sign in"}
                  </CustomButton>
                </div>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

// App footer
export const AppFooter = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      backgroundColor: theme.palette.primary.dark,
    },
    container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    },
  }));
  const classes = useStyles();
  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Copyright />
      </Container>
    </Typography>
  );
};

// Copyright and year
export const Copyright = () => {
  return (
    <Typography align="center" style={{ color: "#fff" }}>
      {"© "}
      <CustomLink href="https://innowhat.com/" passHref={true}>
        innowhat.com
      </CustomLink>
      {new Date().getFullYear()}
    </Typography>
  );
};
