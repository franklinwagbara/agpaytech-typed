import { countriesService } from "../../services";
import { getCountries, saveCountries } from "../../helpers";

describe("CountryService", () => {
  describe("when getting all countries", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (getCountries as any) = jest.fn().mockResolvedValue({ id: 1 });
      });

      it("should return an object", async () => {
        await countriesService.getAll(1, 1, { id: 1 } as any);
        await expect(
          (getCountries as any)(1, 1, { id: 1 })
        ).resolves.toMatchObject({ id: 1 });
      });
    });
  });

  describe("when saving currencies", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (saveCountries as any) = jest.fn().mockResolvedValue({ data: 1 });
      });

      it("should return a result object", async () => {
        await countriesService.saveMany([{ data: 1 }] as any);
        await expect(
          (saveCountries as any)([{ id: 1 }] as any, { id: 1 } as any)
        ).resolves.toMatchObject({ data: 1 });
      });
    });
  });
});
