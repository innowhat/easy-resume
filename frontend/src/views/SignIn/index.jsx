import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { CustomLink, CustomButton } from "../../components/Modules";
import { useMutation, useApolloClient } from "@apollo/client";
import AuthForm from "../../components/Forms/authForm";
import { SIGNIN_USER } from "../../components/Queries";
import { SignInSchema } from "../../components/Validation";
import { HeroLayout, FormLayout } from "../../components/Modules";

const SignInView = () => {
  const [signIn] = useMutation(SIGNIN_USER);
  const client = useApolloClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values, props) => {
    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      //  enqueueSnackbar("Logged in!", { variant: "success" });
      if (data.signIn.user) {
        await router.push("/");
      }
    } catch (error) {
      enqueueSnackbar("Username or password is incorrect", {
        variant: "error",
      });
    }

    // props.setSubmitting(false);
  };

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
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Sign In
            </Typography>
          </React.Fragment>
          <AuthForm
            title={"Login"}
            onSubmit={handleSubmit}
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            fields={[
              { name: "email", label: "Email" },
              { name: "password", label: "Password", type: "password" },
            ]}
          >
            <br />
            <Typography variant={"subtitle1"} align={"center"}>
              Don't have an account?{" "}
              <CustomLink href="/signup" color="secondary">
                SIGN UP
              </CustomLink>
            </Typography>
          </AuthForm>
        </FormLayout>
      </Box>
    </React.Fragment>
  );
};

export default SignInView;
