import { cleanEnv, port, str } from "envalid";

export const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    DB_URI: str(),
  });
};
