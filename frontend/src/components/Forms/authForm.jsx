import {
  Typography,
  Box,
  Button,
  Card,
  Paper,
  CardHeader,
  CardContent,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Formik, Form } from "formik";
import { TextField } from "formik-material-ui";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({}));

const AuthForm = ({
  children,
  title,
  onSubmit,
  initialValues,
  fields,
  validationSchema,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={classes.form}>
          {fields.map((f) => (
            <Field
              key={f.name}
              {...f}
              fullWidth
              margin="normal"
              className={classes.field}
              component={TextField}
            />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            submit
          </Button>
        </Form>
      </Formik>
      {children}
    </div>
  );
};

export default AuthForm;
