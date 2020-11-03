const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    settings: {
      themeTitle: {
        type: String,
        required: true,
      },
      themeColor: {
        type: String,
        required: true,
        default: "#2C1320",
      },
      isPublic: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    _basics: String,
    basics: {
      _about: String,
      about: {
        picture: String,
        firstName: String,
        lastName: String,
        profession: String,
        body: String,
      },
      _personals: String,
      personals: [
        {
          label: String,
          content: String,
        },
      ],
      _socials: String,
      socials: [
        {
          network: String,
          url: String,
        },
      ],
      _additionals: String,
      additionals: [
        {
          title: String,
          body: String,
        },
      ],
    },
    _intro: String,
    intro: [
      {
        title: String,
        body: String,
      },
    ],

    _education: String,
    education: [
      {
        institution: String,
        degree: String,
        startDate: String,
        endDate: String,
        body: String,
      },
    ],
    _work: String,
    work: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        body: String,
      },
    ],
    _skills: String,
    skills: [
      {
        name: String,
        level: Number,
        body: String,
      },
    ],
    _tools: String,
    tools: [
      {
        name: String,
        url: String,
      },
    ],

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = model("Profile", ProfileSchema);
module.exports = Profile;
