import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Typography,
} from "@material-ui/core";
import { School, Work, Build, Code } from "@material-ui/icons";
import { ProgressIndicator } from "../../../components/Modules";

const SingleProfile = ({ profile }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: 0,
      width: "100%",
      //  padding: theme.spacing(2, 0),
    },

    header: {
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    picture: {
      margin: "auto",
      width: "80px",
      height: "80px",
    },

    rightCard: {
      borderRadius: 0,
      width: "100%",
      padding: theme.spacing(5),
      backgroundColor: "#fff",
    },

    leftCard: {
      borderRadius: 0,
      width: "100%",
      padding: theme.spacing(5),
      color: "#fff",
    },

    chip: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  }));
  const classes = useStyles();
  return (
    <Box display="flex" className="print-container">
      <Box
        p={5}
        width="35%"
        bgcolor={profile.settings.themeColor}
        color="#fff"
        className="print-item-left"
      >
        <List
          subheader={
            <Box mb={3} textAlign="center">
              <Typography variant="h6" gutterBottom>
                {profile.basics._about}
              </Typography>
              {profile.basics.about.picture != "" &&
                profile.basics.about.picture != null && (
                  <Avatar
                    alt={profile.title}
                    className={classes.picture}
                    src={profile.basics.about.picture}
                  >
                    {profile.basics.about.picture}
                  </Avatar>
                )}
              <Typography
                color="inherit"
                align="center"
                variant="h5"
                marked="center"
              >
                {profile.basics.about.firstName} {profile.basics.about.lastName}
              </Typography>
              <Typography variant="subtitle1">
                {profile.basics.about.profession}
              </Typography>
              <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                {profile.basics.about.body}
              </Typography>
            </Box>
          }
        >
          <ListItem alignItems="flex-start">
            <ListItemText>
              <Typography variant="h6" color="inherit">
                {profile.basics._personals}
              </Typography>
              {profile.basics.personals.map((personal, index) => (
                <Box key={index} color="#fff">
                  <Typography variant="caption">{personal.label}</Typography>
                  <Typography variant="subtitle2">
                    {personal.content}
                  </Typography>
                </Box>
              ))}
            </ListItemText>
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText>
              <Typography variant="h6" color="inherit">
                {profile.basics._socials}
              </Typography>
              {profile.basics.socials.map((social, index) => (
                <Box key={index} color="#fff">
                  <Typography variant="caption">{social.network}</Typography>
                  <Typography variant="subtitle2"> {social.url}</Typography>
                </Box>
              ))}
            </ListItemText>
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText>
              <Typography variant="h6" color="inherit">
                {profile.basics._additionals}
              </Typography>
              {profile.basics.additionals.map((additional, index) => (
                <Box key={index} color="#fff">
                  <Typography variant="caption">{additional.title}</Typography>
                  <Typography
                    variant="body1"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {additional.body}
                  </Typography>
                </Box>
              ))}
            </ListItemText>
          </ListItem>
        </List>
      </Box>
      <Box p={5} width="65%" bgcolor="#fff" className="print-item-right">
        <List
          subheader={
            <Box>
              <Typography variant="h6">{profile._intro}</Typography>
              {profile.intro.map((item, index) => (
                <Box key={index}>
                  <Typography variant="h5" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {item.body}
                  </Typography>
                </Box>
              ))}
            </Box>
          }
        >
          <ListItem alignItems="flex-start">
            {profile._education && (
              <ListItemAvatar>
                <Avatar style={{ background: profile.settings.themeColor }}>
                  <School fontSize="small" />
                </Avatar>
              </ListItemAvatar>
            )}

            <ListItemText>
              <Typography variant="h6"> {profile._education}</Typography>
              {profile.education.map((item, index) => (
                <Box key={index}>
                  <Box display="flex">
                    <Box flexGrow={1}>
                      <Typography variant="subtitle1">
                        {item.institution}
                      </Typography>
                    </Box>
                    <Box>
                      {item.startDate && (
                        <Typography variant="caption">
                          {item.startDate} - {item.endDate}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Typography variant="subtitle2">{item.degree}</Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {item.body}
                  </Typography>
                </Box>
              ))}
            </ListItemText>
          </ListItem>
          <ListItem alignItems="flex-start">
            {profile._work && (
              <ListItemAvatar>
                <Avatar style={{ background: profile.settings.themeColor }}>
                  <Work fontSize="small" />
                </Avatar>
              </ListItemAvatar>
            )}
            <ListItemText>
              <Typography variant="h6"> {profile._work}</Typography>
              {profile.work.map((item, index) => (
                <Box key={index}>
                  <Box display="flex">
                    <Box flexGrow={1}>
                      <Typography variant="subtitle1">
                        {item.company}
                      </Typography>
                    </Box>
                    <Box>
                      {item.startDate && (
                        <Typography variant="caption">
                          {item.startDate} - {item.endDate}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Typography variant="subtitle2">{item.position}</Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {item.body}
                  </Typography>
                </Box>
              ))}
            </ListItemText>
          </ListItem>
          <ListItem alignItems="flex-start">
            {profile._skills && (
              <ListItemAvatar>
                <Avatar style={{ background: profile.settings.themeColor }}>
                  <Code fontSize="small" />
                </Avatar>
              </ListItemAvatar>
            )}

            <ListItemText>
              <Typography variant="h6"> {profile._skills}</Typography>
              <React.Fragment>
                {profile.skills.map((skill, index) => (
                  <Box key={index}>
                    <Typography variant="subtitle2">
                      {skill.name}
                      <ProgressIndicator value={skill.level} />
                    </Typography>
                    <Typography
                      variant="caption"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {skill.body}
                    </Typography>
                  </Box>
                ))}
              </React.Fragment>
            </ListItemText>
          </ListItem>
          <ListItem alignItems="flex-start">
            {profile._tools && (
              <ListItemAvatar>
                <Avatar style={{ background: profile.settings.themeColor }}>
                  <Build fontSize="small" />
                </Avatar>
              </ListItemAvatar>
            )}

            <ListItemText>
              <Typography variant="h6"> {profile._tools}</Typography>
              <Box className={classes.chip}>
                {profile.tools.map((tool, index) => (
                  <div key={index}>
                    <Chip
                      label={tool.name}
                      variant="outlined"
                      size="small"
                      style={{ borderColor: profile.settings.themeColor }}
                    />
                  </div>
                ))}
              </Box>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SingleProfile;
