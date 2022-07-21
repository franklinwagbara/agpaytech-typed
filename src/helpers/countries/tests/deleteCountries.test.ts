import { CountryModel } from "../../../models";
import deleteCountries from "../deleteCountries";

beforeAll(() => {
  (console.log as any) = jest.fn().mockReturnValue(null);
  (console.error as any) = jest.fn().mockReturnValue(null);
});

describe("deleteCountries", () => {
  describe("when deleting countries", () => {
    describe("if delete is successful", () => {
      beforeEach(() => {
        (CountryModel.deleteMany as any) = jest.fn();
        (CountryModel.deleteMany as any).mockResolvedValue({ success: "ok" });
        (CountryModel.find as any) = jest
          .fn()
          .mockResolvedValue({ success: "ok" });
      });
      it("should return success object: {success: ok}", async () => {
        const res = await deleteCountries(CountryModel, {} as any);
        console.log(res);

        expect(res.data).toMatchObject({ success: "ok" });
      });
    });

    describe("if item(s) not in the database", () => {
      beforeEach(() => {
        (CountryModel.deleteMany as any) = jest.fn();
        (CountryModel.deleteMany as any).mockResolvedValue({
          success: "ok",
        });
        (CountryModel.find as any) = jest.fn().mockResolvedValue(null);
      });
      it("should return error object", async () => {
        const res = await deleteCountries(CountryModel, {} as any);
        expect(res.error).toBeDefined();
      });
    });

    describe("if delete fails", () => {
      beforeEach(() => {
        (CountryModel.deleteMany as any) = jest.fn();
        (CountryModel.deleteMany as any).mockRejectedValue({
          error: "save failed",
        });
        (CountryModel.find as any) = jest
          .fn()
          .mockResolvedValue([{ continent_code: "as" }]);
      });
      it("should return error object", async () => {
        const res = await deleteCountries(CountryModel, {} as any);
        expect(res.error).toBeDefined();
      });
    });

    describe("for query with key, value as continent_code, AS", () => {
      beforeEach(() => {
        (CountryModel.find as any) = jest.fn();
        (CountryModel.find as any).mockResolvedValue([
          {
            data: 1,
          },
        ]);
      });

      it("should change query with key, value to continent_code, /AS/i", async () => {
        const query: any = { continent_code: "AS" };
        const res = await deleteCountries(CountryModel, query);
        expect(query.continent_code).toMatchObject(new RegExp(/AS/i));
      });
    });
  });
});
