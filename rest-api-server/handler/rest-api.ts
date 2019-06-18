import { Request, Response } from "express";

import * as models from "./rest-api.i";

import { CarManager } from "../service/car-crud";

export function getHandler(req: Request, res: Response) {
  console.log("getHandler", req.params);
  const params: models.GetCarParams = {
    name: req.params.name
  };

  new CarManager().getCar$(params).subscribe(
    (result) => res.json(result).end(),
    (error) => res.status(error.code).json(error.message).end(),
  );
};

export function postHandler(req: Request, res: Response) {
  console.log("postHandler", req.body);

  const params: models.PostCarParams = {
    name: req.body.name,
    maker: req.body.maker,
  };

  new CarManager().postCar$(params).subscribe(
    (result) => res.json(result).end(),
    (error) => res.status(error.code).json(error.message).end(),
  );
};

export function putHandler(req: Request, res: Response) {
  console.log("putHandler");

  const params: models.PutCarParams = {
    oldName: req.params.name,
    name: req.body.name,
    maker: req.body.maker,
  };

  new CarManager().putCar$(params).subscribe(
    (result) => res.json(result).end(),
    (error) => res.status(error.code).json(error.message).end(),
  );
};

export function deleteHandler(req: Request, res: Response) {
  console.log("deleteHandler");

  const params: models.DeleteCarParams = {
    name: req.params.name,
  };

  new CarManager().deleteCar$(params).subscribe(
    (result) => res.json(result).end(),
    (error) => res.status(error.code).json(error.message).end(),
  );
};
