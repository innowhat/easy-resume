import WelcomeView from "../views/Home";
import HowItWorks from "../views/Home/how";
import { AppHeader, AppFooter } from "../components/Modules";

const Home = () => {
  return (
    <React.Fragment>
      <AppHeader />
      <WelcomeView />
      <HowItWorks />
      <AppFooter />
    </React.Fragment>
  );
};

export default Home;
