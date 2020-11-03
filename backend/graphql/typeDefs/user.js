const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    confirmed: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  input SignUpInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    firstName: String!
    lastName: String!
  }

  input UpdatePasswordInput {
    password: String!
    confirmPassword: String!
  }

  type SignUpPayload {
    user: User!
  }
  type SignInPayload {
    user: User!
  }

  extend type Query {
    viewer: User
    users: [User!]!
    user(userId: ID): User
  }

  extend type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    updateUser(userId: ID!, input: UpdateUserInput): User!
    updatePassword(userId: ID!, input: UpdatePasswordInput): User!
    deleteUser(userId: ID!): String!
  }
`;
