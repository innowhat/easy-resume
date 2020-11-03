import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/client";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import EditIcon from "@material-ui/icons/Edit";
import AuthForm from "../../components/Forms/authForm";
import {
  UPDATE_USER,
  UPDATE_PASSWORD,
  DELETE_USER,
  GET_USER,
} from "../../components/Queries";
import {
  userValidationSchema,
  passwordValidationSchema,
} from "../../components/Validation";
import { Loading, ErrorMessage } from "../../components/Modules";

import {
  Card,
  CardHeader,
  Typography,
  Paper,
  Box,
  Button,
  ListItemIcon,
  DialogTitle,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  CardContent,
  Avatar,
  CardActions,
} from "@material-ui/core";

const AccountView = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    header: {
      background: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  }));
  const classes = useStyles();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_USER);
  const viewer = data?.viewer;
  const shouldRedirect = !(loading || error || viewer);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (viewer) {
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            className={classes.header}
            title={<Typography variant="h5">ACCOUNT</Typography>}
          />
          <CardContent>{`Account updated at:${viewer.updatedAt}`}</CardContent>
        </Card>

        <Paper className={classes.root}>
          <List>
            <ListItem>
              <ListItemText primary="ID" secondary={viewer.id} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={viewer.email} />
            </ListItem>
            <Divider variant="fullWidth" />
            <ListItem button>
              <ListItemText primary="First name" secondary={viewer.firstName} />
              <UpdateUser />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Last name" secondary={viewer.lastName} />
              <UpdateUser />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Password" secondary="********" />
              <UpdatePassword />
            </ListItem>
          </List>
          <Divider variant="fullWidth" />
          <List>
            <DeleteUser />
          </List>
        </Paper>
      </React.Fragment>
    );
  }

  return (
    <Box paddingTop={20}>
      <Loading />
    </Box>
  );
};

export const UpdateUser = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { error, loading, data } = useQuery(GET_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const handleSubmit = React.useCallback(async (values, props) => {
    try {
      await updateUser({
        variables: {
          userId: data.viewer.id,
          input: {
            ...values,
          },
        },
      });
      enqueueSnackbar("User updated!", { variant: "success" });
      await router.reload("/account");
    } catch (err) {
      enqueueSnackbar(FormErrorMessage(err), { variant: "error" });
    }
    props.setSubmitting(false);
  });

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <Loading />;

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update account</DialogTitle>
        <DialogContent>
          <AuthForm
            title={"Update user information"}
            initialValues={{
              firstName: data.viewer.firstName,
              lastName: data.viewer.lastName,
            }}
            validationSchema={userValidationSchema}
            onSubmit={handleSubmit}
            fields={[
              { name: "firstName", label: "First name *" },
              { name: "lastName", label: "Last name *" },
            ]}
          ></AuthForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export const UpdatePassword = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { error, loading, data } = useQuery(GET_USER);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const handleSubmit = React.useCallback(async (values, props) => {
    try {
      await updatePassword({
        variables: {
          userId: data.viewer.id,
          input: {
            ...values,
          },
        },
      });
      enqueueSnackbar("Password updated!", { variant: "success" });
      await router.reload("/account");
    } catch (err) {
      enqueueSnackbar(FormErrorMessage(err), { variant: "error" });
    }
    props.setSubmitting(false);
  });

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <Loading />;

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update account</DialogTitle>
        <DialogContent>
          <AuthForm
            title={"Confirm password"}
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={passwordValidationSchema}
            onSubmit={handleSubmit}
            fields={[
              { name: "password", label: "Password*", type: "password" },
              {
                name: "confirmPassword",
                label: "Confirm Password *",
                type: "password",
              },
            ]}
          ></AuthForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export const DeleteUser = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data, error, loading } = useQuery(GET_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const handleDelete = React.useCallback(async () => {
    try {
      await deleteUser({
        variables: {
          userId: data.viewer.id,
        },
      });

      enqueueSnackbar("Account Deleted!", { variant: "success" });
      await router.push("/signout");
    } catch (err) {
      enqueueSnackbar(FormErrorMessage(err), { variant: "error" });
    }
  });

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <Loading />;

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} color="primary">
        Delete account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete account ?
          </DialogContentText>

          <Typography variant="caption" color="error">
            This cannot be undone
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDelete} color="primary">
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AccountView;
