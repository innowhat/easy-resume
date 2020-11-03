import { makeStyles } from "@material-ui/core/styles";
import { Add, Close } from "@material-ui/icons";
import {
  CardContent,
  Box,
  MenuItem,
  Grid,
  Typography,
  CardHeader,
  Card,
  FormControl,
  InputLabel,
  Paper,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  FormControlLabel,
} from "@material-ui/core";
import { FieldArray, Form, Formik, Field, getIn } from "formik";
import { AppLayout } from "./../../components/Modules";
import { TextField, Switch } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    background: theme.palette.background.default,
  },

  root: {
    marginBottom: theme.spacing(5),
  },

  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    color: theme.palette.text.secondary,
    background: theme.palette.background.default,
  },

  appBar: {
    position: "fixed",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  settings: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,

    marginBottom: theme.spacing(2),
  },

  header: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },

  button: {
    border: "2px solid green",
    width: "100%",
  },

  card: {
    margin: theme.spacing(2, 0),
    width: "100%",
  },

  rightSide: {
    borderRadius: 0,
    width: "100%",
    padding: theme.spacing(3),
  },

  leftSide: {
    width: "100%",
    padding: theme.spacing(3),
    color: "#fff",
  },
}));

const DialogForm = ({
  title,
  buttonName,
  buttonColor,
  buttonVariant,
  onSubmit,
  initialValues,
  values,
  validationSchema,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        onClick={() => setOpen(true)}
        color={buttonColor}
        variant={buttonVariant}
        style={{ margin: "5px" }}
      >
        {buttonName}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ classes: { root: classes.dialogPaper } }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            submitForm,
          }) => (
            <React.Fragment>
              <AppBar className={classes.appBar}>
                <Container>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={() => setOpen(false)}
                      aria-label="close"
                    >
                      <Close />
                    </IconButton>
                    <Typography
                      variant="h5"
                      className={classes.title}
                      align="center"
                    >
                      {title}
                    </Typography>
                    <Button
                      autoFocus
                      color="secondary"
                      variant="contained"
                      onClick={() => submitForm()}
                    >
                      submit
                    </Button>
                  </Toolbar>
                </Container>
              </AppBar>

              <AppLayout title={title}>
                <Form noValidate autoComplete="off">
                  <Card className={classes.settings}>
                    <CardHeader title="Settings" />
                    <CardContent>
                      <Box
                        bgcolor="primary.contrastText"
                        padding={(0, 5)}
                        display="flex"
                      >
                        <FormControl
                          fullWidth
                          style={{ width: "20%", padding: "0 10px" }}
                        >
                          <Field
                            component={TextField}
                            className={classes.field}
                            name="settings.themeColor"
                            type="color"
                            label="Pick profile color"
                            variant="outlined"
                            required
                          />
                        </FormControl>
                        <Field
                          component={TextField}
                          className={classes.field}
                          name="settings.themeTitle"
                          type="text"
                          label="Profile name"
                          variant="outlined"
                          required
                          fullWidth
                        />
                        <FormControlLabel
                          style={{
                            margin: "auto",
                            color: "#000",
                          }}
                          control={
                            <Field
                              component={Switch}
                              type="checkbox"
                              name="settings.isPublic"
                            />
                          }
                          label="Public"
                        />
                        ;
                      </Box>
                    </CardContent>
                  </Card>
                  <Grid container className={classes.root} spacing={2}>
                    <Grid container item md={4}>
                      <Paper className={classes.leftSide}>
                        <Card className={classes.card} raised>
                          <CardHeader
                            className={classes.cardHeader}
                            title={
                              <Field
                                component={TextField}
                                className={classes.field}
                                name="basics._about"
                                type="text"
                                label="about section"
                                fullWidth
                                variant="filled"
                                size="small"
                              />
                            }
                          ></CardHeader>
                          <CardContent className={classes.cardContent}>
                            <Field
                              component={TextField}
                              className={classes.field}
                              name="basics.about.picture"
                              type="url"
                              label="Picture url"
                              fullWidth
                            />
                            <Field
                              component={TextField}
                              className={classes.field}
                              name="basics.about.firstName"
                              type="text"
                              label="First Name"
                              fullWidth
                            />
                            <Field
                              component={TextField}
                              className={classes.field}
                              name="basics.about.lastName"
                              type="text"
                              label="Last Name"
                              fullWidth
                            />

                            <Field
                              component={TextField}
                              className={classes.field}
                              name="basics.about.profession"
                              type="text"
                              label="Profession"
                              fullWidth
                            />

                            <Field
                              component={TextField}
                              className={classes.field}
                              name="basics.about.body"
                              type="body"
                              label="Body"
                              fullWidth
                              multiline
                            />
                          </CardContent>
                        </Card>
                        <Card className={classes.card} raised>
                          <FieldArray name="basics.personals">
                            {({ push, remove }) => (
                              <div>
                                <CardHeader
                                  className={classes.cardHeader}
                                  title={
                                    <Field
                                      component={TextField}
                                      className={classes.field}
                                      name="basics._personals"
                                      type="text"
                                      label="personals section"
                                      fullWidth
                                      variant="filled"
                                      size="small"
                                    />
                                  }
                                ></CardHeader>
                                <CardContent>
                                  {values.basics.personals.map((p, index) => {
                                    const label = `basics.personals[${index}].label`;
                                    const touchedLabel = getIn(touched, label);
                                    const errorLabel = getIn(errors, label);

                                    const content = `basics.personals[${index}].content`;
                                    const touchedContent = getIn(
                                      touched,
                                      content
                                    );
                                    const errorContent = getIn(errors, content);

                                    return (
                                      <Box
                                        boxShadow={3}
                                        m={1}
                                        p={2}
                                        key={index}
                                        className={classes.cardContent}
                                      >
                                        <Typography align="right">
                                          <IconButton
                                            aria-label="Delete"
                                            onClick={() => remove(index)}
                                            size="small"
                                          >
                                            <Close />
                                          </IconButton>
                                        </Typography>

                                        <Field
                                          className={classes.field}
                                          component={TextField}
                                          label="Label"
                                          type="text"
                                          fullWidth
                                          name={label}
                                          value={p.label}
                                          helperText={
                                            touchedLabel && errorLabel
                                              ? errorLabel
                                              : ""
                                          }
                                          error={Boolean(
                                            touchedLabel && errorLabel
                                          )}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                        <Field
                                          component={TextField}
                                          className={classes.field}
                                          type="text"
                                          fullWidth
                                          label="content"
                                          name={content}
                                          value={p.content}
                                          helperText={
                                            touchedContent && errorContent
                                              ? errorContent
                                              : ""
                                          }
                                          error={Boolean(
                                            touchedContent && errorContent
                                          )}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </Box>
                                    );
                                  })}
                                  <Button
                                    aria-label="add"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                      push({
                                        label: "",
                                        content: "",
                                      })
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </CardContent>
                              </div>
                            )}
                          </FieldArray>
                        </Card>
                        <Card className={classes.card}>
                          <FieldArray name="basics.socials">
                            {({ push, remove }) => (
                              <div>
                                <CardHeader
                                  className={classes.cardHeader}
                                  title={
                                    <Field
                                      component={TextField}
                                      className={classes.field}
                                      name="basics._socials"
                                      type="text"
                                      label="basics section"
                                      fullWidth
                                      size="small"
                                      variant="filled"
                                    />
                                  }
                                ></CardHeader>
                                <CardContent>
                                  {values.basics.socials.map((p, index) => {
                                    const network = `basics.socials[${index}].network`;
                                    const touchedNetwork = getIn(
                                      touched,
                                      network
                                    );
                                    const errorNetwork = getIn(errors, network);

                                    const url = `basics.socials[${index}].url`;
                                    const touchedUrl = getIn(touched, url);
                                    const errorUrl = getIn(errors, url);

                                    return (
                                      <Box
                                        boxShadow={3}
                                        m={1}
                                        p={1}
                                        key={index}
                                        className={classes.cardContent}
                                      >
                                        <Typography align="right">
                                          <IconButton
                                            aria-label="Delete"
                                            onClick={() => remove(index)}
                                            size="small"
                                          >
                                            <Close />
                                          </IconButton>
                                        </Typography>

                                        <Field
                                          className={classes.field}
                                          component={TextField}
                                          label="Network name"
                                          type="text"
                                          fullWidth
                                          name={network}
                                          value={p.network}
                                          helperText={
                                            touchedNetwork && errorNetwork
                                              ? errorNetwork
                                              : ""
                                          }
                                          error={Boolean(
                                            touchedNetwork && errorNetwork
                                          )}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                        <Field
                                          component={TextField}
                                          className={classes.field}
                                          type="text"
                                          fullWidth
                                          label="Url"
                                          name={url}
                                          value={p.url}
                                          helperText={
                                            touchedUrl && errorUrl
                                              ? errorUrl
                                              : ""
                                          }
                                          error={Boolean(
                                            touchedUrl && errorUrl
                                          )}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </Box>
                                    );
                                  })}
                                  <Button
                                    aria-label="add"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                      push({
                                        network: "",
                                        url: "",
                                      })
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </CardContent>
                              </div>
                            )}
                          </FieldArray>
                        </Card>
                        <Card className={classes.card}>
                          <FieldArray name="basics.additionals">
                            {({ push, remove }) => (
                              <div>
                                <CardHeader
                                  className={classes.cardHeader}
                                  title={
                                    <Field
                                      component={TextField}
                                      className={classes.field}
                                      name="basics._additionals"
                                      type="text"
                                      label="additional section"
                                      fullWidth
                                      size="small"
                                      variant="filled"
                                    />
                                  }
                                ></CardHeader>
                                <CardContent>
                                  {values.basics.additionals.map((p, index) => {
                                    const title = `basics.additionals[${index}].title`;
                                    const touchedTitle = getIn(touched, title);
                                    const errorTitle = getIn(errors, title);

                                    const body = `basics.additionals[${index}].body`;
                                    const touchedBody = getIn(touched, body);
                                    const errorBody = getIn(errors, body);

                                    return (
                                      <Box
                                        boxShadow={3}
                                        m={1}
                                        p={1}
                                        key={index}
                                        className={classes.cardContent}
                                      >
                                        <Typography align="right">
                                          <IconButton
                                            aria-label="Delete"
                                            onClick={() => remove(index)}
                                            size="small"
                                          >
                                            <Close />
                                          </IconButton>
                                        </Typography>

                                        <Field
                                          className={classes.field}
                                          component={TextField}
                                          label="Title"
                                          type="text"
                                          fullWidth
                                          name={title}
                                          value={p.title}
                                          helperText={
                                            touchedTitle && errorTitle
                                              ? errorTitle
                                              : ""
                                          }
                                          error={Boolean(
                                            touchedTitle && errorTitle
                                          )}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                        <Field
                                          component={TextField}
                                          className={classes.field}
                                          type="text"
                                          fullWidth
                                          label="Body"
                                          name={body}
                                          multiline
                                          value={p.body}
                                          helperText={
                                            touchedBody && errorBody
                                              ? errorBody
                                              : ""
                                          }
                                          error={Boolean(
                                            touchedBody && errorBody
                                          )}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </Box>
                                    );
                                  })}
                                  <Button
                                    aria-label="add"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                      push({
                                        title: "",
                                        body: "",
                                      })
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </CardContent>
                              </div>
                            )}
                          </FieldArray>
                        </Card>
                      </Paper>
                    </Grid>
                    <Grid container item md={8}>
                      <Paper className={classes.rightSide}>
                        <Card className={classes.card} raised>
                          <FieldArray
                            name="intro"
                            render={(arrayHelpers) => (
                              <div>
                                <CardHeader
                                  className={classes.cardHeader}
                                  title={
                                    <Field
                                      component={TextField}
                                      className={classes.field}
                                      name="_intro"
                                      type="text"
                                      label="intro section"
                                      fullWidth
                                      variant="filled"
                                      size="small"
                                    />
                                  }
                                ></CardHeader>
                                <CardContent>
                                  {values.intro.map((e, index) => (
                                    <Box
                                      boxShadow={3}
                                      m={1}
                                      p={2}
                                      className={classes.cardContent}
                                      key={index}
                                    >
                                      <Typography align="right">
                                        <Button
                                          aria-label="Delete"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <Close />
                                        </Button>
                                      </Typography>
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`intro[${index}].title`}
                                        label="title"
                                        fullWidth
                                      />
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`intro[${index}].body`}
                                        label="Body"
                                        fullWidth
                                        type="body"
                                        fullWidth
                                        multiline
                                      />
                                    </Box>
                                  ))}
                                  {values.intro.length < 1 && (
                                    <Button
                                      aria-label="add"
                                      color="primary"
                                      variant="contained"
                                      fullWidth
                                      onClick={() =>
                                        arrayHelpers.push({
                                          title: "",
                                          body: "",
                                        })
                                      }
                                    >
                                      <Add />
                                    </Button>
                                  )}
                                </CardContent>
                              </div>
                            )}
                          />
                        </Card>
                        <Card className={classes.card} raised>
                          <FieldArray
                            name="education"
                            render={(arrayHelpers) => (
                              <div>
                                <CardHeader
                                  className={classes.cardHeader}
                                  title={
                                    <Field
                                      component={TextField}
                                      className={classes.field}
                                      name="_education"
                                      type="text"
                                      label="education section"
                                      fullWidth
                                      variant="filled"
                                      size="small"
                                    />
                                  }
                                ></CardHeader>
                                <CardContent>
                                  {values.education.map((e, index) => (
                                    <Box
                                      boxShadow={3}
                                      m={1}
                                      p={2}
                                      className={classes.cardContent}
                                      key={index}
                                    >
                                      <Typography align="right">
                                        <Button
                                          aria-label="Delete"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <Close />
                                        </Button>
                                      </Typography>
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`education[${index}].institution`}
                                        label="Institution"
                                        fullWidth
                                      />
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`education[${index}].degree`}
                                        label="Degree"
                                        fullWidth
                                      />
                                      <Field
                                        component={TextField}
                                        name={`education[${index}].startDate`}
                                        type="text"
                                        label="Start date"
                                        className={classes.field}
                                      />
                                      <Field
                                        component={TextField}
                                        name={`education[${index}].endDate`}
                                        type="text"
                                        label="End date"
                                        className={classes.field}
                                      />
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`education[${index}].body`}
                                        label="More information"
                                        fullWidth
                                        multiline
                                        type="body"
                                      />
                                    </Box>
                                  ))}
                                  <Button
                                    aria-label="add"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                      arrayHelpers.push({
                                        institution: "",
                                        degree: "",
                                        startDate: "",
                                        endDate: "",
                                        body: "",
                                      })
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </CardContent>
                              </div>
                            )}
                          />
                        </Card>
                        <Card className={classes.card} raised>
                          <FieldArray
                            name="work"
                            render={(arrayHelpers) => (
                              <div>
                                <CardHeader
                                  className={classes.cardHeader}
                                  title={
                                    <Field
                                      component={TextField}
                                      className={classes.field}
                                      name="_work"
                                      type="text"
                                      label="work section"
                                      fullWidth
                                      variant="filled"
                                      size="small"
                                    />
                                  }
                                ></CardHeader>
                                <CardContent>
                                  {values.work.map((w, index) => (
                                    <Box
                                      boxShadow={3}
                                      m={1}
                                      p={2}
                                      key={index}
                                      className={classes.cardContent}
                                    >
                                      <Typography align="right">
                                        <Button
                                          aria-label="Delete"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <Close />
                                        </Button>
                                      </Typography>
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`work[${index}].company`}
                                        label="Company"
                                        fullWidth
                                      />
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`work[${index}].position`}
                                        label="Position"
                                        fullWidth
                                      />
                                      <Field
                                        component={TextField}
                                        name={`work[${index}].startDate`}
                                        type="text"
                                        label="Start date"
                                        className={classes.field}
                                      />
                                      <Field
                                        component={TextField}
                                        name={`work[${index}].endDate`}
                                        type="text"
                                        label="End date"
                                        className={classes.field}
                                      />
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`work[${index}].body`}
                                        label="More information"
                                        fullWidth
                                        multiline
                                        type="body"
                                      />
                                    </Box>
                                  ))}
                                  <Button
                                    aria-label="add"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                      arrayHelpers.push({
                                        company: "",
                                        position: "",
                                        startDate: "",
                                        endDate: "",
                                        body: "",
                                      })
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </CardContent>
                              </div>
                            )}
                          />
                        </Card>
                        <Card className={classes.card} raised>
                          <FieldArray
                            name="skills"
                            render={(arrayHelpers) => (
                              <div>
                                <CardHeader
                                  className={classes.cardHeader}
                                  title={
                                    <Field
                                      component={TextField}
                                      className={classes.field}
                                      name="_skills"
                                      type="text"
                                      label="skills section"
                                      fullWidth
                                      variant="filled"
                                      size="small"
                                    />
                                  }
                                ></CardHeader>
                                <CardContent>
                                  {values.skills.map((s, index) => (
                                    <Box
                                      boxShadow={3}
                                      m={1}
                                      p={2}
                                      className={classes.cardContent}
                                      key={index}
                                    >
                                      <Typography align="right">
                                        <Button
                                          aria-label="Delete"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <Close />
                                        </Button>
                                      </Typography>
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`skills[${index}].name`}
                                        type="text"
                                        label="Name"
                                        fullWidth
                                      />
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`skills[${index}].level`}
                                        placeholder="1"
                                        label="Level"
                                        fullWidth
                                        helperText="0 to 100"
                                        type="number"
                                        InputProps={{
                                          inputProps: { min: 0, max: 100 },
                                        }}
                                      />

                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`skills[${index}].body`}
                                        label="More information"
                                        fullWidth
                                        multiline
                                        type="body"
                                      />
                                    </Box>
                                  ))}
                                  <Button
                                    aria-label="add"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                      arrayHelpers.push({
                                        name: "",
                                        level: 0,
                                        body: "",
                                      })
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </CardContent>
                              </div>
                            )}
                          />
                        </Card>

                        <Card className={classes.card} raised>
                          <FieldArray
                            name="tools"
                            render={(arrayHelpers) => (
                              <div>
                                <CardHeader
                                  className={classes.cardHeader}
                                  title={
                                    <Field
                                      component={TextField}
                                      className={classes.field}
                                      name="_tools"
                                      type="text"
                                      label="tools section"
                                      fullWidth
                                      variant="filled"
                                      size="small"
                                    />
                                  }
                                ></CardHeader>
                                <CardContent>
                                  {values.tools.map((t, index) => (
                                    <Box
                                      display="flex"
                                      boxShadow={3}
                                      m={1}
                                      p={1}
                                      className={classes.cardContent}
                                      key={index}
                                    >
                                      <Field
                                        component={TextField}
                                        className={classes.field}
                                        name={`tools[${index}].name`}
                                        label="Name"
                                        fullWidth
                                      />
                                      <IconButton
                                        aria-label="Delete"
                                        type="button"
                                        variant="outlined"
                                        color="primary"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <Close fontSize="small" />
                                      </IconButton>
                                    </Box>
                                  ))}
                                  <Button
                                    aria-label="add"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                      arrayHelpers.push({
                                        name: "",
                                      })
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </CardContent>
                              </div>
                            )}
                          />
                        </Card>
                      </Paper>
                    </Grid>
                  </Grid>
                </Form>
              </AppLayout>
            </React.Fragment>
          )}
        </Formik>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogForm;
