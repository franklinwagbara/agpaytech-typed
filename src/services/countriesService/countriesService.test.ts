import { countriesService } from "../../services";
import { getCountries, saveCountries, deleteCountries } from "../../helpers";
import { CountryModel } from "../../models";

describe("CountryService", () => {
  describe("when getting all countries", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (getCountries as any) = jest.fn().mockResolvedValue({ id: 1 });
      });

      it("should return an object", async () => {
        const res = await countriesService.getAll(1, 1, { id: 1 } as any);
        expect(res).toMatchObject({ id: 1 });
      });
    });
  });

  describe("when saving currencies", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (saveCountries as any) = jest.fn().mockResolvedValue({ data: 1 });
      });

      it("should return a result object", async () => {
        const res = await countriesService.saveMany([{ data: 1 }] as any);
        expect(res).toMatchObject({ data: 1 });
      });
    });
  });

  describe("when deleting currencies", () => {
    describe("if successful", () => {
      beforeEach(() => {
        (deleteCountries as any) = jest.fn().mockResolvedValue({ data: 1 });
      });

      it("should return a result object", async () => {
        const res = await countriesService.delete({
          continent_code: "AS",
        } as any);
        expect(res).toMatchObject({ data: 1 });
      });
    });
  });
});
