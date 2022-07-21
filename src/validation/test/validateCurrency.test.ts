import validateCurrency from "../validateCurrency";
import { schema } from "../validateCurrency";

describe("validateCurrency", () => {
  describe("when validating currency", () => {
    describe("if validation is successful", () => {
      beforeEach(() => {
        (schema.validate as any) = jest.fn().mockReturnValue({ success: true });
      });

      it("should return success object", () => {
        expect(validateCurrency({ continent_code: "AS" })).toMatchObject({
          success: true,
        });
      });
    });

    describe("if validation is not successful", () => {
      beforeEach(() => {
        (schema.validate as any) = jest.fn().mockReturnValue({ error: true });
      });

      it("should return success object", () => {
        expect(validateCurrency({ continent_code: "AS" })).toMatchObject({
          error: true,
        });
      });
    });
  });
});
