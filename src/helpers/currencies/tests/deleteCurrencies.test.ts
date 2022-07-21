import { CurrencyModel } from "../../../models";
import deleteCurrencies from "../deleteCurrencies";

beforeAll(() => {
  (console.log as any) = jest.fn().mockReturnValue(null);
  (console.error as any) = jest.fn().mockReturnValue(null);
});

describe("deleteCurrencies", () => {
  describe("when deleting currencies", () => {
    describe("if delete is successful", () => {
      beforeEach(() => {
        (CurrencyModel.deleteMany as any) = jest.fn();
        (CurrencyModel.deleteMany as any).mockResolvedValue({ success: "ok" });
        (CurrencyModel.find as any) = jest
          .fn()
          .mockResolvedValue({ success: "ok" });
      });
      it("should return success object: {success: ok}", async () => {
        const res = await deleteCurrencies(CurrencyModel, {} as any);
        expect(res.data).toMatchObject({ success: "ok" });
      });
    });

    describe("if item(s) not in the database", () => {
      beforeEach(() => {
        (CurrencyModel.deleteMany as any) = jest.fn();
        (CurrencyModel.deleteMany as any).mockResolvedValue({
          success: "ok",
        });
        (CurrencyModel.find as any) = jest.fn().mockResolvedValue(null);
      });
      it("should return error object", async () => {
        const res = await deleteCurrencies(CurrencyModel, {} as any);
        expect(res.error).toBeDefined();
      });
    });

    describe("if delete fails", () => {
      beforeEach(() => {
        (CurrencyModel.deleteMany as any) = jest.fn();
        (CurrencyModel.deleteMany as any).mockRejectedValue({
          error: "save failed",
        });
        (CurrencyModel.find as any) = jest
          .fn()
          .mockResolvedValue([{ continent_code: "as" }]);
      });
      it("should return error object", async () => {
        const res = await deleteCurrencies(CurrencyModel, {} as any);
        expect(res.error).toBeDefined();
      });
    });

    describe("for query with key, value as continent_code, AS", () => {
      beforeEach(() => {
        (CurrencyModel.find as any) = jest.fn();
        (CurrencyModel.find as any).mockResolvedValue([
          {
            data: 1,
          },
        ]);
      });

      it("should change query with key, value to continent_code, /AS/i", async () => {
        const query: any = { continent_code: "AS" };
        const res = await deleteCurrencies(CurrencyModel, query);
        expect(query.continent_code).toMatchObject(new RegExp(/AS/i));
      });
    });
  });
});
