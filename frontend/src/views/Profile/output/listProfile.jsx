import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import {
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItem,
  List,
  Divider,
  ListItemIcon,
} from "@material-ui/core";
import { Comment } from "@material-ui/icons";
import ShareAction from "../action/shareAction";
import ViewAction from "../action/viewAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListProfile = ({ profile }) => {
  const classes = useStyles();

  const dateFormatter = (date) => new Date(date).toLocaleDateString();

  return (
    <div className={classes.root}>
      <List component="nav">
        <Link
          href="/profile/view/[profileId]"
          as={`/profile/view/${profile.id}`}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar
                style={{ background: profile.settings.themeColor }}
                variant="rounded"
              >
                {" "}
                {""}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              style={{ width: "60px" }}
              primary={
                <Typography variant="subtitle2" gutterBottom>
                  {profile.settings.themeTitle}
                </Typography>
              }
              secondary={
                <Typography variant="caption" gutterBottom>
                  {dateFormatter(profile.updatedAt)}
                </Typography>
              }
            />

            <ListItemIcon>
              <ShareAction profileId={profile.id}> share</ShareAction>
              <ViewAction profileId={profile.id}>view</ViewAction>
            </ListItemIcon>
          </ListItem>
        </Link>
        <Divider variant="fullWidth" />
      </List>
    </div>
  );
};

export default ListProfile;
