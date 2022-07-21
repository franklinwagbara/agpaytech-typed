import { CountryModel } from "../../../models";
import saveCountries from "../saveCountries";
import { validateCountry } from "../../../validation";

beforeAll(() => {
  (console.log as any) = jest.fn().mockReturnValue(null);
  (console.error as any) = jest.fn().mockReturnValue(null);
});

describe("saveCountries", () => {
  describe("when saving countries", () => {
    describe("if save is successful", () => {
      beforeEach(() => {
        (CountryModel.insertMany as any) = jest.fn();
        (CountryModel.insertMany as any).mockResolvedValue({ success: "ok" });
        (validateCountry as any) = jest.fn().mockReturnValue({ success: "ok" });
      });
      it("should return success object: {success: ok}", async () => {
        const res = await saveCountries(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CountryModel
        );
        expect(res.data).toMatchObject({ success: "ok" });
      });
    });

    describe("if validation fails", () => {
      beforeEach(() => {
        (CountryModel.insertMany as any) = jest.fn();
        (CountryModel.insertMany as any).mockResolvedValue({
          success: "ok",
        });
        (validateCountry as any) = jest
          .fn()
          .mockReturnValue({ error: "invalid data" });
      });
      it("should return error object", async () => {
        const res = await saveCountries(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CountryModel
        );
        expect(res.error).toBeDefined();
      });
    });

    describe("if save fails", () => {
      beforeEach(() => {
        (CountryModel.insertMany as any) = jest.fn();
        (CountryModel.insertMany as any).mockRejectedValue({
          error: "save failed",
        });
      });
      it("should return error object", async () => {
        const res = await saveCountries(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CountryModel
        );
        expect(res.error).toBeDefined();
      });
    });
  });
});
