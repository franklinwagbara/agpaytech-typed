import { CurrencyModel } from "../../../models";
import saveCurrencies from "../saveCurrencies";
import { validateCurrency } from "../../../validation";

beforeAll(() => {
  (console.log as any) = jest.fn().mockReturnValue(null);
  (console.error as any) = jest.fn().mockReturnValue(null);
});

describe("saveCurrencies", () => {
  describe("when saving currencies", () => {
    describe("if save is successful", () => {
      beforeEach(() => {
        (CurrencyModel.insertMany as any) = jest.fn();
        (CurrencyModel.insertMany as any).mockResolvedValue({ success: "ok" });
        (validateCurrency as any) = jest
          .fn()
          .mockReturnValue({ success: "ok" });
      });
      it("should return success object: {success: ok}", async () => {
        const res = await saveCurrencies(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CurrencyModel
        );
        expect(res.data).toMatchObject({ success: "ok" });
      });
    });

    describe("if validation fails", () => {
      beforeEach(() => {
        (CurrencyModel.insertMany as any) = jest.fn();
        (CurrencyModel.insertMany as any).mockResolvedValue({
          success: "ok",
        });
        (validateCurrency as any) = jest
          .fn()
          .mockReturnValue({ error: "invalid data" });
      });
      it("should return error object", async () => {
        const res = await saveCurrencies(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CurrencyModel
        );
        expect(res.error).toBeDefined();
      });
    });

    describe("if save fails", () => {
      beforeEach(() => {
        (CurrencyModel.insertMany as any) = jest.fn();
        (CurrencyModel.insertMany as any).mockRejectedValue({
          error: "save failed",
        });
      });
      it("should return error object", async () => {
        const res = await saveCurrencies(
          [{ continent_code: "AS" }, { continent_code: "EU" }] as any,
          CurrencyModel
        );
        expect(res.error).toBeDefined();
      });
    });
  });
});
