import joi, { ObjectSchema } from 'joi';

const signinSchema: ObjectSchema = joi.object().keys({
  username: joi.alternatives().conditional(joi.string().email(), {
    then: joi.string().email().required().messages({
      'string.base': 'email must be a string',
      'string.email': 'email must be a valid email',
      'string.empty': 'email cannot be an empty field'
    }),
    otherwise: joi.string().alphanum().min(4).max(12).required().messages({
      'string.base': 'username must be a string',
      'string.alphanum': 'username must be alphanumeric',
      'string.min': 'username must be at least 4 characters',
      'string.max': 'username must be at most 12 characters',
      'string.empty': 'username cannot be an empty field'
    })
  }),
  password: joi.string().alphanum().min(8).max(16).required().messages({
    'string.base': 'password must be a string',
    'string.alphanum': 'password must be alphanumeric',
    'string.min': 'password must be at least 8 characters',
    'string.max': 'password must be at most 16 characters',
    'string.empty': 'password cannot be an empty field'
  })
});
export { signinSchema };
