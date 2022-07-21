import validateCountry from "../validateCountry";
import { schema } from "../validateCountry";

describe("validateCountry", () => {
  describe("when validating country", () => {
    describe("if validation is successful", () => {
      beforeEach(() => {
        (schema.validate as any) = jest.fn().mockReturnValue({ success: true });
      });

      it("should return success object", () => {
        expect(validateCountry({ continent_code: "AS" })).toMatchObject({
          success: true,
        });
      });
    });

    describe("if validation is not successful", () => {
      beforeEach(() => {
        (schema.validate as any) = jest.fn().mockReturnValue({ error: true });
      });

      it("should return success object", () => {
        expect(validateCountry({ continent_code: "AS" })).toMatchObject({
          error: true,
        });
      });
    });
  });
});
