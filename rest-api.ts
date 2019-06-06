import { Request, Response } from "express";

export function getHandler(req: Request, res: Response) {
  return res.send("get cars").end();
};

export function postHandler(req: Request, res: Response) {
  return res.send("post cars").end();
};

export function putHandler(req: Request, res: Response) {
  return res.send("put cars").end();
};

export function deleteHandler(req: Request, res: Response) {
  return res.send("delete cars").end();
};
