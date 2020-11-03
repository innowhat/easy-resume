import UpdateProfile from "../input/updateProfiles";

const UpdateAction = ({ profileId }) => {
  return (
    <React.Fragment>
      <UpdateProfile profileId={profileId} />
    </React.Fragment>
  );
};

export default UpdateAction;
