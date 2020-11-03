import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AccountForm = ({
  children,
  title,
  initialValues,
  fields,
  validationSchema,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
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
        </Form>
      </Formik>
      {children}
    </div>
  );
};

export default AccountForm;
