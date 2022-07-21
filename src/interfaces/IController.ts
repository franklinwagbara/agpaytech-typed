import { Request, Response } from "express";
import express from "express";
import { Model, Models } from "mongoose";

export interface IController<T> {
  path: string;
  model: Model<T>;
  router: express.Router;
  initializeRoutes(): void;
  getAll(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  getUploadPage(req: Request, res: Response): Promise<Response> | void;
  postUploadCSV(req: Request, res: Response): Promise<Response>;
}
