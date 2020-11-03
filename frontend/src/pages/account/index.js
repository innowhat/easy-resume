import { AppLayout, AppHeader, AppFooter } from "../../components/Modules";
import AccountView from "../../views/Account";
import PrivatePage from "../../lib/privatePage";

const AccountPage = ({ viewer }) => {
  return (
    <PrivatePage>
      <AppHeader />
      <AppLayout title="Account">
        <AccountView viewer={viewer} />
      </AppLayout>
      <AppFooter />
    </PrivatePage>
  );
};

export default AccountPage;
