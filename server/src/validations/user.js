import Joi from 'joi';

const passwordValidator = Joi.string()
  .pattern(/^[a-zA-Z0-9!#@$]{8,72}$/)
  .required();

export const registerValidation = (data) => {
  const userValidation = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z ]{2,36}$/)
      .required(),
    username: Joi.string().alphanum().min(6).max(36).required(),
    email: Joi.string()
      .min(6)
      .max(100)
      .email({ minDomainSegments: 2 })
      .required(),
    password: passwordValidator,
    repeat_password: Joi.ref('password'),
  });
  return userValidation.validate(data);
};

export const loginValidation = (data) => {
  const userValidation = Joi.object({
    emailOrUsername: Joi.alternatives()
      .try(
        Joi.string().min(6).max(100).email({ minDomainSegments: 2 }),
        Joi.string().alphanum().min(6).max(36)
      )
      .required(),
    password: passwordValidator,
  });
  return userValidation.validate(data);
};

export const deleteValidation = (data) => {
  const userValidation = Joi.object({
    password: passwordValidator,
  });
  return userValidation.validate(data);
};
