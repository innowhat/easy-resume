import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GET_USER {
    viewer {
      id
      email
      lastName
      firstName
      createdAt
      updatedAt
    }
  }
`;
export const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`;
export const SIGNOUT_USER = gql`
  mutation signOut {
    signOut
  }
`;
export const SIGNUP_USER = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $input: UpdateUserInput) {
    updateUser(userId: $userId, input: $input) {
      firstName
      lastName
    }
  }
`;
export const UPDATE_PASSWORD = gql`
  mutation updatePassword($userId: ID!, $input: UpdatePasswordInput) {
    updatePassword(userId: $userId, input: $input) {
      id
      email
      firstName
      lastName
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export const GET_PROFILE = gql`
  query profile($profileId: ID!) {
    profile(profileId: $profileId) {
      id
      createdAt
      updatedAt
      settings {
        themeTitle
        themeColor
        isPublic
      }
      _basics
      basics {
        about {
          picture
          profession
          body
          lastName
          firstName
        }
        _personals
        personals {
          label
          content
        }
        _socials
        socials {
          network
          url
        }
        _additionals
        additionals {
          title
          body
        }
      }
      _intro
      intro {
        title
        body
      }
      _education
      education {
        institution
        endDate
        degree
        startDate
        body
      }
      _work
      work {
        company
        position
        startDate
        endDate
        body
      }
      _skills
      skills {
        name
        level
        body
      }
      _tools
      tools {
        name
        url
      }
    }
  }
`;

export const GET_PUBLIC_PROFILE = gql`
  query publicProfile($profileId: ID!) {
    publicProfile(profileId: $profileId) {
      id
      createdAt
      updatedAt
      settings {
        themeTitle
        themeColor
        isPublic
      }
      _basics
      basics {
        about {
          picture
          profession
          body
          lastName
          firstName
        }
        _personals
        personals {
          label
          content
        }
        _socials
        socials {
          network
          url
        }
        _additionals
        additionals {
          title
          body
        }
      }
      _intro
      intro {
        title
        body
      }
      _education
      education {
        institution
        endDate
        degree
        startDate
        body
      }
      _work
      work {
        company
        position
        startDate
        endDate
        body
      }
      _skills
      skills {
        name
        level
        body
      }
      _tools
      tools {
        name
        url
      }
    }
  }
`;

export const GET_PROFILES = gql`
  {
    profiles {
      id
      createdAt
      updatedAt
      settings {
        themeTitle
        themeColor
        isPublic
      }
      _basics
      basics {
        about {
          picture
          profession
          body
          lastName
          firstName
        }
        _personals
        personals {
          label
          content
        }
        _socials
        socials {
          network
          url
        }
        _additionals
        additionals {
          title
          body
        }
      }
      _intro
      intro {
        title
        body
      }
      _education
      education {
        institution
        endDate
        degree
        startDate
        body
      }
      _work
      work {
        company
        position
        startDate
        endDate
        body
      }
      _skills
      skills {
        name
        level
        body
      }
      _tools
      tools {
        name
        url
      }
    }
  }
`;
export const ADD_PROFILE = gql`
  mutation addProfile($input: ProfileInput) {
    addProfile(input: $input) {
      id
      createdAt
      updatedAt
      settings {
        themeTitle
        themeColor
        isPublic
      }
      _basics
      basics {
        about {
          picture
          profession
          body
          lastName
          firstName
        }
        _personals
        personals {
          label
          content
        }
        _socials
        socials {
          network
          url
        }
        _additionals
        additionals {
          title
          body
        }
      }
      _intro
      intro {
        title
        body
      }
      _education
      education {
        institution
        endDate
        degree
        startDate
        body
      }
      _work
      work {
        company
        position
        startDate
        endDate
        body
      }
      _skills
      skills {
        name
        level
        body
      }
      _tools
      tools {
        name
        url
      }
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation updateProfile($profileId: ID!, $input: ProfileInput) {
    updateProfile(profileId: $profileId, input: $input) {
      id
      createdAt
      updatedAt
      settings {
        themeTitle
        themeColor
        isPublic
      }
      _basics
      basics {
        about {
          picture
          profession
          body
          lastName
          firstName
        }
        _personals
        personals {
          label
          content
        }
        _socials
        socials {
          network
          url
        }
        _additionals
        additionals {
          title
          body
        }
      }
      _intro
      intro {
        title
        body
      }
      _education
      education {
        institution
        endDate
        degree
        startDate
        body
      }
      _work
      work {
        company
        position
        startDate
        endDate
        body
      }
      _skills
      skills {
        name
        level
        body
      }
      _tools
      tools {
        name
        url
      }
    }
  }
`;
export const DELETE_PROFILE = gql`
  mutation deleteProfile($profileId: ID!) {
    deleteProfile(profileId: $profileId)
  }
`;

export const GET_THEME = gql`
  {
    __type(name: "Color") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`;
