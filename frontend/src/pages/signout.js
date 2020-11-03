import { AppLayout } from "../components/Modules";
import SignOutView from "../views/SignOut";

const SignOut = () => {
  return (
    <React.Fragment>
      <AppLayout title="Sign out" maxWidth="xs">
        <SignOutView />
      </AppLayout>
    </React.Fragment>
  );
};

export default SignOut;
