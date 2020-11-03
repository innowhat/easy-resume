const { gql } = require("apollo-server-express");

module.exports = gql`
  enum Color {
    BLACK
    GREY
    BLUE
  }

  scalar Date

  type Settings {
    themeTitle: String!
    themeColor: String!
    isPublic: Boolean!
  }
  input SettingsInput {
    themeTitle: String!
    themeColor: String!
    isPublic: Boolean!
  }

  type About {
    picture: String
    firstName: String
    lastName: String
    profession: String
    body: String
  }
  input AboutInput {
    picture: String
    firstName: String
    lastName: String
    profession: String
    body: String
  }

  type Personals {
    label: String
    content: String
  }
  input PersonalsInput {
    label: String
    content: String
  }

  type Socials {
    network: String
    url: String
  }
  input SocialsInput {
    network: String
    url: String
  }

  type Additionals {
    title: String
    body: String
  }
  input AdditionalsInput {
    title: String
    body: String
  }

  type Basics {
    _about: String
    about: About
    _personals: String
    personals: [Personals]
    _socials: String
    socials: [Socials]
    _additionals: String
    additionals: [Additionals]
  }
  input BasicsInput {
    _about: String
    about: AboutInput
    _personals: String
    personals: [PersonalsInput]
    _socials: String
    socials: [SocialsInput]
    _additionals: String
    additionals: [AdditionalsInput]
  }

  type Intro {
    title: String
    body: String
  }

  input IntroInput {
    title: String
    body: String
  }

  type Education {
    institution: String
    degree: String
    startDate: String
    endDate: String
    body: String
  }
  input EducationInput {
    institution: String
    degree: String
    startDate: String
    endDate: String
    body: String
  }

  type Work {
    company: String
    position: String
    startDate: String
    endDate: String
    body: String
  }
  input WorkInput {
    company: String
    position: String
    startDate: String
    endDate: String
    body: String
  }

  type Skills {
    name: String
    level: Int
    body: String
  }
  input SkillsInput {
    name: String
    level: Int
    body: String
  }

  type Tools {
    name: String
    url: String
  }
  input ToolsInput {
    name: String
    url: String
  }

  input ProfileInput {
    _settings: String
    settings: SettingsInput!
    _basics: String
    basics: BasicsInput
    _intro: String
    intro: [IntroInput]
    _education: String
    education: [EducationInput]
    _work: String
    work: [WorkInput]
    _skills: String
    skills: [SkillsInput]
    _tools: String
    tools: [ToolsInput]
  }

  type Profile {
    id: ID!
    _settings: String
    settings: Settings!
    _basics: String
    basics: Basics
    _intro: String
    intro: [Intro]
    _education: String
    education: [Education]
    _work: String
    work: [Work]
    _skills: String
    skills: [Skills]
    _tools: String
    tools: [Tools]
    creator: User!
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Query {
    profiles: [Profile!]!
    profile(profileId: ID!): Profile!
    publicProfile(profileId: ID!): Profile!
  }
  extend type Mutation {
    addProfile(input: ProfileInput): Profile
    updateProfile(profileId: ID!, input: ProfileInput): Profile
    deleteProfile(profileId: ID!): String!
  }

  extend type Subscription {
    profileCreated: Profile
  }
`;
