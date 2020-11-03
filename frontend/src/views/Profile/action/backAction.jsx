import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import {  ArrowBack } from "@material-ui/icons";


const BackAction = ({ profileId }) => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Button variant="text" size="small" onClick={() => router.back()}>
        <ArrowBack />
      </Button>
  </React.Fragment>
  );
};

export default BackAction;
