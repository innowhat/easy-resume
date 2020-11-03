const { hash, compare } = require("bcryptjs");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const User = require("../../models/user");
const { setLoginSession, getLoginSession } = require("../../middleware/auth");
const {
  removeTokenCookie,
  parseCookies,
} = require("../../middleware/auth-cookies");
const {
  signInValidationSchema,
  signUpValidationSchema,
  updateUserValidationSchema,
  updatePasswordValidationSchema,
} = require("../validators/user");

module.exports = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Custom date scalar",
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return new Date(Number(value));
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),

  Query: {
    viewer: async (_root, _args, { req }, _info) => {
      try {
        const session = await getLoginSession(req);
        if (session) {
          return User.findOne({ email: session.email });
        }
      } catch (error) {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        );
      }
    },
    users: async (_root, _args, { req }, _info) => {
      try {
        const session = await getLoginSession(req);
        if (!session) {
          throw new AuthenticationError("UNAUTHENTICATED");
        }
        return await User.find({});
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    signIn: async (_root, args, { res }, _info) => {
      try {
        await signInValidationSchema.validateAsync(args.input, {
          abortEarly: false,
        });
        const user = await User.findOne({ email: args.input.email });
        if (!user) {
          throw new UserInputError("User does not exist!");
        }
        const isPassword = await compare(args.input.password, user.password);
        if (!isPassword) {
          throw new UserInputError("Password is incorrect!");
        }

        if (user && isPassword) {
          const session = {
            id: user.id,
            email: user.email,
          };

          await setLoginSession(res, session);

          return { user };
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },

    signUp: async (_root, args, _context, _info) => {
      try {
        await signUpValidationSchema.validateAsync(args.input, {
          abortEarly: false,
        });
        const existingUser = await User.findOne({
          email: args.input.email,
        });
        if (existingUser) {
          throw new UserInputError("User exists already.");
        }
        if (args.input.password !== args.input.confirmPassword) {
          throw new UserInputError("Passwords don't match");
        }
        const hashedPassword = await hash(args.input.password, 12);
        const user = await User.create({
          ...args.input,
          password: hashedPassword,
        });
        return {
          user,
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    updateUser: async (_root, args, { req }, _info) => {
      try {
        await updateUserValidationSchema.validateAsync(args.input, {
          abortEarly: false,
        });
        const session = await getLoginSession(req);
        if (!session) {
          throw new AuthenticationError("UNAUTHENTICATED");
        }
        if (session.id !== args.userId) {
          throw new UserInputError(`User not found `);
        }
        const update_user = await User.findByIdAndUpdate(
          { _id: args.userId },
          { $set: args.input },
          { new: true }
        );
        return update_user;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    updatePassword: async (_root, args, { req }, _info) => {
      try {
        await updatePasswordValidationSchema.validateAsync(args.input, {
          abortEarly: false,
        });
        const session = await getLoginSession(req);
        if (!session) {
          throw new AuthenticationError("UNAUTHENTICATED");
        }
        if (session.id != args.userId) {
          throw new UserInputError(`User not found `);
        }
        if (args.password !== args.confirmPassword) {
          throw new UserInputError("Passwords don't match");
        }
        const hashedPassword = await hash(args.input.password, 12);
        const update_user_password = await User.findByIdAndUpdate(
          { _id: args.userId },
          { $set: args.input, password: hashedPassword },
          { new: true }
        );
        return update_user_password;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    deleteUser: async (_root, args, { req }, _info) => {
      try {
        const session = await getLoginSession(req);
        if (!session) {
          throw new AuthenticationError("UNAUTHENTICATED");
        }
        if (session.id != args.userId) {
          throw new UserInputError(
            `You don't the rights to delete this account `
          );
        }

        const delete_user = await User.findByIdAndDelete({
          creator: session,
          _id: args.userId,
        });

        if (!delete_user) {
          throw new UserInputError("User not found");
        }

        return "User deleted successfully";
      } catch (err) {
        throw new Error(err.message);
      }
    },

    signOut: async (_root, _args, { res }, _info) => {
      removeTokenCookie(res);
      return true;
    },
  },
};
