import Joi from "joi";

export const schema = Joi.object({
  continent_code: Joi.string().required(),
  currency_code: Joi.string().optional().allow(""),
  iso2_code: Joi.string().optional().allow(""),
  iso3_code: Joi.string().optional().allow(""),
  iso_numeric_code: Joi.string().optional().allow(""),
  fips_code: Joi.string().optional().allow(""),
  calling_code: Joi.string().optional().allow(""),
  common_name: Joi.string().optional().allow(""),
  official_name: Joi.string().optional().allow(""),
  endonym: Joi.string().optional().allow(""),
  demonym: Joi.string().optional().allow(""),
});

export const validateCountry = (Country: any) => {
  return schema.validate(Country, { abortEarly: false });
};

export default validateCountry;
