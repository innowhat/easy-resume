import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import { DELETE_PROFILE } from "../../../components/Queries";

const DeleteAction = ({ profileId, children }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteProfile] = useMutation(DELETE_PROFILE);
  const handleDelete = React.useCallback(async () => {
    try {
      await deleteProfile({
        variables: {
          profileId: profileId,
        },
      });
      enqueueSnackbar("Deleted!", { variant: "success" });

      await router.push('/profile"', "/profile", { shallow: true });
    } catch (err) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  });

  return (
    <React.Fragment>
      <Button onClick={handleDelete} size="small">
        <DeleteForever />
        {children}
      </Button>
    </React.Fragment>
  );
};

export default DeleteAction;
