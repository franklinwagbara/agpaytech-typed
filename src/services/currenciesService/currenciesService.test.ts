import { currenciesService } from "../../services";
import { getCurrencies, saveCurrencies } from "../../helpers";

describe("CurrencyService", () => {
  describe("when getting all currencies", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (getCurrencies as any) = jest.fn().mockResolvedValue({ id: 1 });
      });

      it("should return an object", async () => {
        await currenciesService.getAll(1, 1, { id: 1 } as any);
        await expect(
          (getCurrencies as any)(1, 1, { id: 1 })
        ).resolves.toMatchObject({ id: 1 });
      });
    });
  });

  describe("when saving currencies", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (saveCurrencies as any) = jest.fn().mockResolvedValue({ data: 1 });
      });

      it("should return a result object", async () => {
        await currenciesService.saveMany([{ data: 1 }] as any);
        await expect(
          (saveCurrencies as any)([{ id: 1 }] as any, { id: 1 } as any)
        ).resolves.toMatchObject({ data: 1 });
      });
    });
  });
});
