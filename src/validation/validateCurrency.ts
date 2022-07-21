import Joi from "joi";

export const schema = Joi.object({
  iso_code: Joi.string().required(),
  iso_numeric_code: Joi.string().optional().allow(""),
  common_name: Joi.string().optional().allow(""),
  official_name: Joi.string().optional().allow(""),
  symbol: Joi.string().optional().allow(""),
});

export const validateCurrency = (Country: any) => {
  return schema.validate(Country, { abortEarly: false });
};

export default validateCurrency;
