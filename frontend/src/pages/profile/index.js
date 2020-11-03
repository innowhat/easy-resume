import { AppLayout, AppHeader, AppFooter } from "../../components/Modules";
import Profiles from "../../views/Profile";
import PrivatePage from "../../lib/privatePage";

const ProfilePage = () => {
  return (
    <PrivatePage>
      <AppHeader />
      <AppLayout title="Profile">
        <Profiles />
      </AppLayout>
      <AppFooter />
    </PrivatePage>
  );
};

export default ProfilePage;
