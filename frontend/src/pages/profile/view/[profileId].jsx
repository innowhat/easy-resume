import { useRouter } from "next/router";
import { AppLayout, AppHeader, AppFooter } from "../../../components/Modules";
import PrivateProfile from "../../../views/Profile/privateProfile";
import PrivatePage from "../../../lib/privatePage";

const Index = () => {
  const router = useRouter();
  const profileId = router.query.profileId;
  return (
    <PrivatePage>
      <AppHeader />
      <AppLayout title="Profile - view">
        <PrivateProfile profileId={profileId} />
      </AppLayout>
      <AppFooter />
    </PrivatePage>
  );
};

export default Index;
