import { CountryModel } from "../../../models";
import saveCountries from "../saveCountries";

beforeAll(() => {
  (console.log as any) = jest.fn().mockReturnValue(null);
  (console.error as any) = jest.fn().mockReturnValue(null);
});
describe("savCountries", () => {
  describe("when saving countries", () => {
    describe("if save is successful", () => {
      beforeEach(() => {
        (CountryModel.insertMany as any) = jest.fn();
        (CountryModel.insertMany as any).mockResolvedValue({ success: "ok" });
      });
      it("should return success object: {success: ok}", async () => {
        const res = await saveCountries(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CountryModel
        );
        expect(res.data).toMatchObject({ success: "ok" });
      });
    });

    describe("if save fails", () => {
      beforeEach(() => {
        (CountryModel.insertMany as any) = jest.fn();
        (CountryModel.insertMany as any).mockRejectedValue({
          error: "save failed",
        });
      });
      it("should return success object: {success: ok}", async () => {
        const res = await saveCountries(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CountryModel
        );
        expect(res.error).toMatch('{"error":"save failed"}');
      });
    });
  });
});
