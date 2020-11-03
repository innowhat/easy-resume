import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@apollo/client";
import faker from "faker";
import DialogForm from "../../../components/Forms/dialogForm";
import { ADD_PROFILE, GET_USER } from "../../../components/Queries";
import {
  Loading,
  ErrorMessage,
  FormErrorMessage,
} from "../../../components/Modules";
import { profileValidationSchema } from "../../../components/Validation";

//Initial state with values
const initialWithValues = {
  settings: {
    isPublic: false,
    themeTitle: faker.lorem.words(), //new Date().toISOString(),
    themeColor: faker.internet.color(),
  },
  _basics: "BASICS",
  basics: {
    _about: "ABOUT",
    about: {
      picture: faker.image.avatar(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profession: faker.name.title(),
      body: faker.lorem.paragraph(),
    },
    _personals: "PERSONAL",
    personals: [
      {
        label: "Email",
        content: faker.internet.email(),
      },
      {
        label: "Phone",
        content: faker.phone.phoneNumber(),
      },
      {
        label: "Website",
        content: faker.internet.url(),
      },
      {
        label: "Location",
        content: faker.address.country(),
      },
    ],
    _socials: "SOCIALS",
    socials: [
      {
        network: "Github",
        url: "github.com/inno",
      },
      {
        network: "Facebook",
        url: "facebook.com/inno",
      },
      {
        network: "LinkedIn",
        url: "linkedIn.com/inno",
      },
    ],
    _additionals: "",
    additionals: [],
  },
  _intro: "",
  intro: [],
  _education: "EDUCATION",
  education: [
    {
      institution: "University of North",
      degree: "Bachelor of BIT",
      startDate: "01-2011",
      endDate: "01-2013",
      body: "",
    },
    {
      institution: "UAS",
      degree: "Bachelor of ICT",
      startDate: "01-2014",
      endDate: "01-2015",
      body: "",
    },
    {
      institution: "Mercury high school",
      degree: "High school degree",
      startDate: "01-2012",
      endDate: "01-2013",
      body: "",
    },
  ],
  _work: "WORK",
  work: [
    {
      company: faker.company.companyName(),
      position: faker.name.jobTitle(),
      startDate: "01-2014",
      endDate: "01-2015",
      body: "",
    },
    {
      company: faker.company.companyName(),
      position: faker.name.jobTitle(),
      startDate: "01-2016",
      endDate: "01-2017",
      body: "",
    },
    {
      company: faker.company.companyName(),
      position: faker.name.jobTitle(),
      startDate: "01-2012",
      endDate: "01-2012",
      body: "",
    },
  ],
  _skills: "SKILLS",
  skills: [
    {
      name: "REACT",
      level: 90,
    },
    {
      name: "HTML",
      level: 90,
    },
    {
      name: "CSS",
      level: 90,
    },
    {
      name: "JAVASCRIPT",
      level: 70,
    },
    {
      name: "GRAPHQL",
      level: 70,
    },
    {
      name: "PYTHON",
      level: 50,
    },
  ],

  _tools: "TOOLS & TECHNOLOGIES",
  tools: [
    { name: "Contentful" },
    { name: "Gatsby" },
    { name: "Atom" },
    { name: "Github" },
    { name: "JIRA" },
    { name: "Azure" },
    { name: "Docker" },
    { name: "Adobe" },
    { name: "NextJS" },
    { name: "Apollo" },
  ],
};

//Initial state without values
const initialWithOutValues = {
  settings: {
    isPublic: false,
    themeTitle: "",
    themeColor: faker.internet.color(),
  },
  _basics: "BASICS",
  basics: {
    _about: "ABOUT",
    about: {
      picture: "",
      firstName: "",
      lastName: "",
      profession: "",
      body: "",
    },
    _personals: "PERSONAL",
    personals: [],
    _socials: "SOCIALS",
    socials: [],
    _additionals: "",
    additionals: [],
  },
  _intro: "",
  intro: [],
  _education: "EDUCATION",
  education: [],
  _work: "WORK",
  work: [],
  _skills: "SKILLS",
  skills: [],

  _tools: "TOOLS & TECHNOLOGIES",
  tools: [],
};

//Initial cover letter values
const initialCoverLetterWithValues = {
  settings: {
    isPublic: false,
    themeTitle: faker.lorem.words(), //new Date().toISOString(),
    themeColor: faker.internet.color(),
  },
  _basics: "BASICS",
  basics: {
    _about: "ABOUT",
    about: {
      picture: faker.image.avatar(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profession: faker.name.title(),
      body: "",
    },
    _personals: "PERSONAL",
    personals: [
      {
        label: "Email",
        content: faker.internet.email(),
      },
      {
        label: "Phone",
        content: faker.phone.phoneNumber(),
      },
      {
        label: "Website",
        content: faker.internet.url(),
      },
      {
        label: "Location",
        content: faker.address.country(),
      },
    ],
    _socials: "SOCIALS",
    socials: [
      {
        network: "Github",
        url: "github.com/inno",
      },
      {
        network: "Facebook",
        url: "facebook.com/inno",
      },
      {
        network: "LinkedIn",
        url: "linkedIn.com/inno",
      },
    ],
    _additionals: "",
    additionals: [],
  },
  _intro: "",
  intro: [
    {
      title: `Application for ${faker.name.title()}`,
      body: ` 
${faker.lorem.paragraphs(6)}

Regards,
${faker.name.firstName()} ${faker.name.lastName()}`,
    },
  ],
  _education: "",
  education: [],
  _work: "",
  work: [],
  _skills: "",
  skills: [],
  _tools: "",
  tools: [],
};

const AddProfile = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error } = useQuery(GET_USER);
  const [addProfile] = useMutation(ADD_PROFILE);
  const handleSubmit = React.useCallback(async (values, props) => {
    try {
      await addProfile({
        variables: {
          input: {
            ...values,
          },
        },
      });
      enqueueSnackbar("Profile added successfully", {
        variant: "success",
      });
      //TODO fix router
      await router.push("/profile");
      await router.reload();
    } catch (err) {
      enqueueSnackbar(FormErrorMessage(err), { variant: "error" });
      console.log("ERROR in Add profile form ", { err });
    }
    props.setSubmitting(false);
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <React.Fragment>
      <DialogForm
        title={"Add profile"}
        onSubmit={handleSubmit}
        initialValues={initialWithOutValues}
        validationSchema={profileValidationSchema}
        buttonName="Add new profile"
        buttonColor="primary"
        buttonVariant="contained"
      />
      <DialogForm
        title={"Add profile"}
        onSubmit={handleSubmit}
        initialValues={initialWithValues}
        validationSchema={profileValidationSchema}
        buttonName="Generate sample profile"
        buttonColor="primary"
        buttonVariant="contained"
      />
      <DialogForm
        title={"Add cover letter"}
        onSubmit={handleSubmit}
        initialValues={initialCoverLetterWithValues}
        validationSchema={profileValidationSchema}
        buttonName="Generate sample cover letter"
        buttonColor="primary"
        buttonVariant="contained"
      />
    </React.Fragment>
  );
};

export default AddProfile;
