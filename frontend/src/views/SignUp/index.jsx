import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CustomLink, FormErrorMessage } from "../../components/Modules";
import { SIGNUP_USER } from "../../components/Queries";
import { SignUpSchema } from "../../components/Validation";
import AuthForm from "../../components/Forms/authForm";
//import Typography from "../../components/Mui/Typography";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";

import { FormLayout } from "../../components/Modules";

const SignUpView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [signUp] = useMutation(SIGNUP_USER);
  const router = useRouter();

  const handleSubmit = React.useCallback(async (values, props) => {
    try {
      await signUp({
        variables: {
          input: {
            ...values,
          },
        },
      });
      enqueueSnackbar(
        "Account created successfully, please sign in to continue",
        {
          variant: "success",
        }
      );
      router.push("/signin");
    } catch (error) {
      enqueueSnackbar(FormErrorMessage(error), { variant: "error" });
      console.log("ERROR in SignUp ", { error });
    }
    props.setSubmitting(false);
  });

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <CustomLink href="/" color="inherit" variant="h5">
            {"EASY RESUME"}
          </CustomLink>
        </Toolbar>
      </AppBar>
      <Box paddingTop={10}>
        <FormLayout>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign up
          </Typography>
          <AuthForm
            title={"Sign up"}
            onSubmit={handleSubmit}
            validationSchema={SignUpSchema}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            fields={[
              { name: "firstName", label: "First name *" },
              { name: "lastName", label: "Last name *" },
              { name: "email", label: "Email *", type: "email" },
              { name: "password", label: "Password *", type: "password" },
              {
                name: "confirmPassword",
                label: "Confirm Password *",
                type: "password",
              },
            ]}
          >
            <br />
            <Typography variant={"subtitle1"} align={"center"}>
              Already have an account?{" "}
              <CustomLink href={"/signin"} color="secondary">
                SIGN IN
              </CustomLink>
            </Typography>
          </AuthForm>
        </FormLayout>
      </Box>
    </React.Fragment>
  );
};

export default SignUpView;
