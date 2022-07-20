import { CurrencyModel } from "../../../models";
import saveCurrencies from "../saveCurrencies";

beforeAll(() => {
  (console.log as any) = jest.fn().mockReturnValue(null);
  (console.error as any) = jest.fn().mockReturnValue(null);
});

describe("savCountries", () => {
  describe("when saving countries", () => {
    describe("if save is successful", () => {
      beforeEach(() => {
        (CurrencyModel.insertMany as any) = jest.fn();
        (CurrencyModel.insertMany as any).mockResolvedValue({ success: "ok" });
      });
      it("should return success object: {success: ok}", async () => {
        const res = await saveCurrencies(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CurrencyModel
        );
        expect(res.data).toMatchObject({ success: "ok" });
      });
    });

    describe("if save fails", () => {
      beforeEach(() => {
        (CurrencyModel.insertMany as any) = jest.fn();
        (CurrencyModel.insertMany as any).mockRejectedValue({
          error: "save failed",
        });
      });
      it("should return success object: {success: ok}", async () => {
        const res = await saveCurrencies(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CurrencyModel
        );
        expect(res.error).toMatch('{"error":"save failed"}');
      });
    });
  });
});
