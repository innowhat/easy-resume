import { useRouter } from "next/router";
import { Container } from "@material-ui/core";
import { AppLayout, AppHeader } from "../../../components/Modules";
import PublicProfile from "../../../views/Profile/publicProfile";

const Index = () => {
  const router = useRouter();
  const profileId = router.query.profileId;
  return (
    <Container style={{ paddingBottom: "50px", paddingTop: "50px" }}>
      <PublicProfile profileId={profileId} />
    </Container>
  );
};

export default Index;
