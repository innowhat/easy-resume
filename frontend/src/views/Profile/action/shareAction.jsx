import { useRouter } from "next/router";
import { Share } from "@material-ui/icons";
import {
  CustomButton,
  ErrorMessage,
  Loading,
} from "../../../components/Modules";
import { GET_PUBLIC_PROFILE } from "../../../components/Queries";
import { useQuery } from "@apollo/client";

const ShareAction = ({ profileId, children }) => {
  //Functions
  const { data } = useQuery(GET_PUBLIC_PROFILE, {
    variables: { profileId: profileId },
  });
  if (data)
    return (
      <React.Fragment>
        <CustomButton
          variant="outlined"
          size="small"
          color="primary"
          href="/profile/share/[profileId]"
          as={`/profile/share/${profileId}`}
        >
          <Share />
          {children}
        </CustomButton>
      </React.Fragment>
    );

  return <div />;
};

export default ShareAction;
