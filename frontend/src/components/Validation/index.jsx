import * as Yup from "yup";

//SIGN IN FORM VALIDATION
export const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
});

// SIGN UP FORM VALIDATION
export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required("Required field"),
  lastName: Yup.string().required("Required field"),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string().test(
    "confirm-password",
    "Passwords do not match",
    function (v) {
      const { password } = this.parent;
      return password === v;
    }
  ),
});

//UPDATE PASSWORD VALIDATION
export const passwordValidationSchema = Yup.object().shape({
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string().test(
    "confirm-password",
    "Passwords does not match",
    function (v) {
      const { password } = this.parent;
      return password === v;
    }
  ),
});

export const userValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});

//PROFILE VALIDATION

export const profileValidationSchema = Yup.object().shape({
  settings: Yup.object().shape({
    themeTitle: Yup.string().required("Required field"),
    themeColor: Yup.string().required("Required field"),
    isPublic: Yup.boolean().required(),
  }),
  _basics: Yup.string(),
  basics: Yup.object().shape({
    _about: Yup.string().nullable(),
    about: Yup.object().shape({
      picture: Yup.string().nullable(),
      firstName: Yup.string().nullable(),
      lastName: Yup.string().nullable(),
      profession: Yup.string().nullable(),
      body: Yup.string().nullable(),
    }),
    _personals: Yup.string().nullable(),
    personals: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().nullable(),
        content: Yup.string().nullable(),
      })
    ),
    _socials: Yup.string().nullable(),
    socials: Yup.array().of(
      Yup.object().shape({
        network: Yup.string().nullable(),
        url: Yup.string().nullable(),
      })
    ),
    _additionals: Yup.string().nullable(),
    additionals: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().nullable(),
        body: Yup.string().nullable(),
      })
    ),
  }),
  _intro: Yup.string().nullable(),
  intro: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().nullable(),
      body: Yup.string().nullable(),
    })
  ),
  _education: Yup.string().nullable(),
  education: Yup.array().of(
    Yup.object().shape({
      institution: Yup.string().nullable(),
      degree: Yup.string().nullable(),
      startDate: Yup.string().nullable(),
      endDate: Yup.string().nullable(),
      body: Yup.string().nullable(),
    })
  ),
  _work: Yup.string().nullable(),
  work: Yup.array().of(
    Yup.object().shape({
      company: Yup.string().nullable(),
      position: Yup.string().nullable(),
      startDate: Yup.string().nullable(),
      endDate: Yup.string().nullable(),
      body: Yup.string().nullable(),
    })
  ),
  _skills: Yup.string().nullable(),
  skills: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().nullable(),
      level: Yup.number().min(0).max(100).nullable(),
      body: Yup.string().nullable(),
    })
  ),
  _tools: Yup.string().nullable(),
  tools: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().nullable(),
      // url: Yup.string().nullable(),
    })
  ),
});
