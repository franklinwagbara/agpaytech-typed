import { currenciesService } from "../../services";
import { getCurrencies, saveCurrencies, deleteCurrencies } from "../../helpers";

describe("CurrencyService", () => {
  describe("when getting all currencies", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (getCurrencies as any) = jest.fn().mockResolvedValue({ id: 1 });
      });

      it("should return an object", async () => {
        const res = await currenciesService.getAll(1, 1, { id: 1 } as any);
        expect(res).toMatchObject({ id: 1 });
      });
    });
  });

  describe("when saving currencies", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (saveCurrencies as any) = jest.fn().mockResolvedValue({ data: 1 });
      });

      it("should return a result object", async () => {
        const res = await currenciesService.saveMany([{ data: 1 }] as any);
        expect(res).toMatchObject({ data: 1 });
      });
    });
  });

  describe("when deleting currencies", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (deleteCurrencies as any) = jest.fn().mockResolvedValue({ data: 1 });
      });

      it("should return a result object", async () => {
        const res = await currenciesService.delete({
          continent_code: "AS",
        } as any);
        expect(res).toMatchObject({ data: 1 });
      });
    });
  });
});
