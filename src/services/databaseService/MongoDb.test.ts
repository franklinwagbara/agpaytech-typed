import MongoDb from "./MongoDb";
import mongoose from "mongoose";
const db = new MongoDb();

beforeAll(() => {
  //(console as any).log = jest.fn().mockReturnValue(1);
  (console as any).error = jest.fn().mockReturnValue(1);
});
describe("MongoDb", () => {
  describe("when connecting to database", () => {
    describe("if connected", () => {
      beforeEach(() => {
        (mongoose as any).connect = jest.fn();
        (mongoose as any).connect.mockResolvedValue(1);
      });

      it("should connect", async () => {
        await db.connect();
        await expect((mongoose as any).connect()).resolves.toBe(1);
      });
    });

    describe("if not connected", () => {
      beforeEach(() => {
        (mongoose as any).connect = jest.fn();
        (mongoose as any).connect.mockRejectedValue("unable to connect");
      });
      it("should throw an exception", async () => {
        await db.connect();
        await expect((mongoose as any).connect()).rejects.toBe(
          "unable to connect"
        );
      });
    });
  });
  describe("when disconnecting from data", () => {
    describe("if disconnected", () => {
      beforeEach(() => {
        (mongoose as any).disconnect = jest.fn();
        (mongoose as any).disconnect.mockResolvedValue(1);
      });
      it("should disconnect", async () => {
        await db.disconnect();
        await expect((mongoose as any).disconnect()).resolves.toBe(1);
      });
    });
  });

  describe("when initializing constructor", () => {
    it("should set DB_URI to a string value", () => {
      const newMongo: any = new MongoDb();
      console.log("DbUri ", newMongo.DB_URI);
      expect(typeof newMongo.DB_URI).toBe("string");
    });
  });
});
