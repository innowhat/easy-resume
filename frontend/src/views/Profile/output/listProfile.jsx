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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListProfile = ({ profile }) => {
  const classes = useStyles();
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
              primary={<Typography variant="caption"> {"Title"}</Typography>}
              secondary={
                <Typography variant="subtitle2" gutterBottom>
                  {profile.settings.themeTitle}
                </Typography>
              }
            />

            <ListItemText
              style={{ width: "30px" }}
              primary={<Typography variant="caption"> {"Date"}</Typography>}
              secondary={
                <Typography variant="subtitle2" gutterBottom>
                  {profile.updatedAt}
                </Typography>
              }
            />
            <ListItemIcon>
              <Comment />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Divider variant="fullWidth" />
      </List>
    </div>
  );
};

export default ListProfile;
