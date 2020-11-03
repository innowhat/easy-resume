import { useRouter } from "next/router";
import { Comment } from "@material-ui/icons";

import { CustomButton } from "../../../components/Modules";

const ViewAction = ({ profileId, children }) => {
  return (
    <React.Fragment>
      <CustomButton
        variant="outlined"
        size="small"
        color="primary"
        href="/profile/view/[profileId]"
        as={`/profile/view/${profileId}`}
      >
        <Comment />
        {children}
      </CustomButton>
    </React.Fragment>
  );
};

export default ViewAction;
