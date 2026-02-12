import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),

  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]+$/)
    .min(7)
    .max(15)
    .required(),
  email: Joi.string().email().optional(),

  isFavourite: Joi.boolean().default(false),

  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),

  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]+$/)
    .min(7)
    .max(15),

  email: Joi.string().email().optional(),

  isFavourite: Joi.boolean().default(false),

  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
});
