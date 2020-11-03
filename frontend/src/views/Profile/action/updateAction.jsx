import UpdateProfile from "../input/updateProfiles";

const UpdateAction = ({ profileId, children }) => {
  return (
    <React.Fragment>
      <UpdateProfile profileId={profileId}>{children}</UpdateProfile>
    </React.Fragment>
  );
};

export default UpdateAction;
