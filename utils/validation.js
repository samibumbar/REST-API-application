import Joi from "joi";

export function validateContact(contact, partial = false) {
  const schema = Joi.object({
    name: partial ? Joi.string().optional() : Joi.string().required(),
    email: partial
      ? Joi.string().email().optional()
      : Joi.string().email().required(),
    phone: partial ? Joi.string().optional() : Joi.string().required(),
  });
  return schema.validate(contact);
}
