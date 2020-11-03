const Joi = require("joi");
const themeTitle = Joi.string().max(120).required().label("Name");
const themeColor = Joi.string()
  .min(3)
  .max(10)
  .required()
  .pattern(new RegExp("^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"))
  .label("Color");

const isPublic = Joi.boolean();

const title = Joi.string().max(120).allow(null, "").label("Title");
const body = Joi.string().max(6000).allow(null, "").label("Body");
const picture = Joi.string().max(320).allow(null, "").label("Picture");
const firstName = Joi.string().max(120).allow(null, "").label("First name");
const lastName = Joi.string().max(120).allow(null, "").label("Last name");
const institution = Joi.string().max(120).allow(null, "").label("Institution");
const profession = Joi.string().max(120).allow(null, "").label("Profession");
const label = Joi.string().max(120).allow(null, "").label("Label");
const content = Joi.string().max(120).allow(null, "").label("Content");
const network = Joi.string().max(120).allow(null, "").label("network");
const url = Joi.string().max(120).allow(null, "").label("URL");
const name = Joi.string().max(120).allow(null, "").label("Name");
const degree = Joi.string().max(120).allow(null, "").label("Degree");
const startDate = Joi.string().max(120).allow(null, "").label("Start date");
const endDate = Joi.string().max(120).allow(null, "").label("End date");
const company = Joi.string().max(120).allow(null, "").label("Company");
const position = Joi.string().max(120).allow(null, "").label("Position");
const level = Joi.number().min(0).max(100).allow(null, "").label("Level");
const website = Joi.string().max(120).allow(null, "").label("Website");
const language = Joi.string().max(120).allow(null, "").label("Language");
const fluency = Joi.string().max(120).allow(null, "").label("Fluency");
const keywords = Joi.string().max(120).allow(null, "").label("Keywords");
const reference = Joi.string().max(120).allow(null, "").label("Reference");

const _settings = Joi.string()
  .max(120)
  .allow(null, "")
  .label("Settings header");
const settings = Joi.object({ themeColor, themeTitle, isPublic });
const _about = Joi.string().max(120).allow(null, "").label("About header");
const about = Joi.object({
  picture,
  profession,
  firstName,
  lastName,
  body,
});
const _personals = Joi.string()
  .max(120)
  .allow(null, "")
  .label("Personals header");
const personals = Joi.array().items({ label, content });
const _socials = Joi.string().max(120).allow(null, "").label("Socials header");
const socials = Joi.array().items({ network, url });
const _additionals = Joi.string()
  .max(120)
  .allow(null, "")
  .label("Additionals header");
const additionals = Joi.array().items({ title, body });
const _basics = Joi.string().max(120).allow(null, "").label("Basics header");
const basics = Joi.object({
  _about,
  about,
  _personals,
  personals,
  _socials,
  socials,
  _additionals,
  additionals,
});
const _intro = Joi.string().max(120).allow(null, "").label("Intro header");
const intro = Joi.array().items({
  title,
  body,
});
const _education = Joi.string()
  .max(120)
  .allow(null, "")
  .label("Education header");
const education = Joi.array().items({
  institution,
  degree,
  startDate,
  endDate,
  body,
});
const _work = Joi.string().max(120).allow(null, "").label("Work header");
const work = Joi.array().items({ company, position, startDate, endDate, body });
const _skills = Joi.string().max(120).allow(null, "").label("Skills header");
const skills = Joi.array().items({ name, level, body });
const _tools = Joi.string().max(120).allow(null, "").label("Tools header");
const tools = Joi.array().items({ name, url });

const profileValidationSchema = Joi.object({
  _settings,
  settings,
  _basics,
  basics,
  _intro,
  intro,
  _education,
  education,
  _work,
  work,
  _skills,
  skills,
  _tools,
  tools,
});

module.exports.profileValidationSchema = profileValidationSchema;
