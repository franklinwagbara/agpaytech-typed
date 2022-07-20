import getCurrencies from "../getCurrencies";
import { CurrencyModel } from "../../../models";

beforeAll(() => {
  (console as any).log = jest.fn().mockReturnValue(null);
  (console as any).error = jest.fn().mockReturnValue(null);
});

describe("getCurrencies", () => {
  describe("when getting countries", () => {
    describe("if page number is zero", () => {
      beforeEach(() => {
        (CurrencyModel.find as any) = jest.fn();
        (CurrencyModel.find as any).mockResolvedValue([
          {
            data: 1,
          },
          {
            data: 1,
          },
        ]);
      });

      it("should return next page value as 1", async () => {
        const res = await getCurrencies(CurrencyModel, 0, 1, {} as any);
        expect((res.data as any).next.page).toBe(2);
      });
    });

    describe("if page size is zero", () => {
      beforeEach(() => {
        (CurrencyModel.find as any) = jest.fn();
        (CurrencyModel.find as any).mockResolvedValue([
          {
            data: 1,
          },
          {
            data: 1,
          },
        ]);
      });

      it("should return next page limit value as 10", async () => {
        const res = await getCurrencies(CurrencyModel, 2, 0, {} as any);
        expect((res.data as any).previous.limit).toBe(10);
      });
    });

    describe("if page less than 0 or size is less than 0", () => {
      beforeEach(() => {
        (CurrencyModel.find as any) = jest.fn();
        (CurrencyModel.find as any).mockRejectedValue(
          "Wrong query parameter(s)"
        );
      });

      it("should throw an exception", async () => {
        const res = await getCurrencies(CurrencyModel, -1, -1, {} as any);
        expect(res.error).toBeTruthy();
      });
    });
    describe("if page is not less than 0 or size is not less than 0", () => {
      beforeEach(() => {
        (CurrencyModel.find as any) = jest.fn();
        (CurrencyModel.find as any).mockResolvedValue({
          data: 1,
          error: null,
        });
      });

      it("should return an data object", async () => {
        const res = await getCurrencies(CurrencyModel, 1, 1, {} as any);
        expect(res.data).toBeTruthy();
      });
    });

    describe("if endIndex (page * size) less than number of return countries", () => {
      beforeEach(() => {
        (CurrencyModel.find as any) = jest.fn();
        (CurrencyModel.find as any).mockResolvedValue([
          {
            data: 1,
          },
          {
            data: 2,
          },
        ]);
      });

      it("should return result containing next page greater than one", async () => {
        const res = await getCurrencies(CurrencyModel, 1, 1, {} as any);
        expect((res.data as any).next.page).toBeGreaterThan(1);
      });
    });

    describe("if endIndex (page * size) greater than number of return countries", () => {
      beforeEach(() => {
        (CurrencyModel.find as any) = jest.fn();
        (CurrencyModel.find as any).mockResolvedValue([
          {
            data: 1,
          },
        ]);
      });

      it("should return result containing next page equal to null", async () => {
        const res = await getCurrencies(CurrencyModel, 1, 5, {} as any);
        expect((res.data as any).next.page).toBeNull();
      });
    });

    describe("if startIndex (page - 1) greater than 0", () => {
      beforeEach(() => {
        (CurrencyModel.find as any) = jest.fn();
        (CurrencyModel.find as any).mockResolvedValue([
          {
            data: 1,
          },
        ]);
      });

      it("should return result containing previous page equal to current page - 1", async () => {
        const res = await getCurrencies(CurrencyModel, 2, 5, {} as any);
        expect((res.data as any).previous.page).toBe(1);
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
        const res = await getCurrencies(CurrencyModel, 1, 1, query);
        expect(query.continent_code).toMatchObject(new RegExp(/AS/i));
      });
    });
  });
});
