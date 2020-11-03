import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@apollo/client";
import EditIcon from "@material-ui/icons/Edit";
import DialogForm from "../../../components/Forms/dialogForm";
import { UPDATE_PROFILE, GET_PROFILE } from "../../../components/Queries";
import {
  Loading,
  ErrorMessage,
  FormErrorMessage,
} from "../../../components/Modules";
import { profileValidationSchema } from "../../../components/Validation";

const UpdateProfile = ({ profileId }) => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { profileId: profileId },
  });

  const { enqueueSnackbar } = useSnackbar();
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const handleSubmit = React.useCallback(async (values, props) => {
    try {
      await updateProfile({
        variables: {
          profileId: profileId,
          input: {
            ...values,
          },
        },
      });
      enqueueSnackbar("Profile updated successfully", {
        variant: "success",
      });
      await router.push('/profile"', `/profile/view/${profileId}`, {
        shallow: true,
      });
      // await router.push(`/profile/view/${profileId}`);
    } catch (err) {
      enqueueSnackbar(FormErrorMessage(err), { variant: "error" });
      console.log("ERROR in Update profile form ", { err });
    }
    props.setSubmitting(false);
    //  console.log("onSubmit", JSON.stringify(values, null, 2));
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const profile = data.profile;

  return (
    <DialogForm
      title={"Update profile"}
      onSubmit={handleSubmit}
      initialValues={{
        settings: profile.settings,
        _basics: profile._basics,
        basics: profile.basics,
        _intro: profile._intro,
        intro: profile.intro,
        _education: profile._education,
        education: profile.education,
        _work: profile._work,
        work: profile.work,
        _skills: profile._skills,
        skills: profile.skills,
        _tools: profile._tools,
        tools: profile.tools,
      }}
      validationSchema={profileValidationSchema}
      buttonName={<EditIcon />}
      buttonColor="primary"
    />
  );
};

export default UpdateProfile;
