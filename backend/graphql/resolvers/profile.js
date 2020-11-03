const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const Profile = require("../../models/profile");
const { getLoginSession } = require("../../middleware/auth");
const { profileValidationSchema } = require("../validators/profile");
const { PubSub, withFilter } = require("apollo-server");

const PROFILE_CREATED = "PROFILE_CREATED";
const pubsub = new PubSub();

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
    profiles: async (_root, _args, { req }, _info) => {
      try {
        const session = await getLoginSession(req);
        if (!session) {
          throw new AuthenticationError("UNAUTHENTICATED");
        }
        const getProfiles = await Profile.find({
          creator: session.id,
        })
          .populate("creator")
          .sort({ updatedAt: -1 });
        return getProfiles;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    profile: async (_root, args, { req }, _info) => {
      try {
        const session = await getLoginSession(req);
        if (!session) {
          throw new AuthenticationError("UNAUTHENTICATED");
        }
        const getProfile = await Profile.findOne({
          creator: session.id,
          _id: args.profileId,
        }).populate("creator");

        if (!getProfile) {
          throw new UserInputError("Profile not found");
        }
        return getProfile;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    publicProfile: async (_root, args, { req }, _info) => {
      try {
        const getProfile = await Profile.findOne({
          _id: args.profileId,
        }).populate("creator");
        if (getProfile.settings.isPublic === true) {
          return getProfile;
        }
        throw new UserInputError("Profile not found");
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    addProfile: async (_root, { input }, { req }, _info) => {
      try {
        await profileValidationSchema.validateAsync(input, {
          abortEarly: false,
        });
        const session = await getLoginSession(req);
        if (!session) {
          throw new AuthenticationError("UNAUTHENTICATED");
        }
        const addProfile = await (
          await Profile.create({ ...input, creator: session.id })
        ).execPopulate("creator");

        await pubsub.publish(PROFILE_CREATED, { profileCreated: addProfile });

        return addProfile;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    updateProfile: async (_root, args, { req }, _info) => {
      try {
        await profileValidationSchema.validateAsync(args.input, {
          abortEarly: false,
        });
        const session = await getLoginSession(req);
        if (!session) {
          throw new AuthenticationError("UNAUTHENTICATED");
        }
        let edit_profile = await Profile.findOneAndUpdate(
          { creator: session.id, _id: args.profileId },
          { $set: args.input },
          { new: true }
        );
        if (!edit_profile) {
          throw new Error("Profile not found");
        }
        edit_profile = edit_profile.populate("creator").execPopulate();
        return edit_profile;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    deleteProfile: async (_root, args, { req }, i_nfo) => {
      try {
        const session = await getLoginSession(req);
        if (!session) {
          throw new AuthenticationError("UNAUTHENTICATED");
        }
        const delete_profile = await Profile.findOneAndDelete({
          creator: session.id,
          _id: args.profileId,
        }).populate("creator");

        if (!delete_profile) {
          throw new UserInputError("Profile not found");
        }
        return "Profile deleted successfully";
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Subscription: {
    profileCreated: {
      subscribe: () => pubsub.asyncIterator([PROFILE_CREATED]),
    },
  },
};
