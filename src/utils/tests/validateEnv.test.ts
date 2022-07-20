import "dotenv/config";
import { validateEnv } from "../validateEnv";

describe("validateEnv", () => {
  describe("when validating Env", () => {
    describe("if validation is successful", () => {
      it("should return an object with Env. variable(s)", () => {
        const res = validateEnv();
        expect(res).toMatchObject({});
      });
    });
  });
});
