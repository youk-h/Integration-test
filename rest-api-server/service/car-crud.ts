import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { QueryResult } from "pg";

import * as models from "./car-crud.i";

import { sqlPath } from "../utils";
import { Database } from "../database/postgres";

export class CarManager {
  public getCar$(params: models.GetCarParams): Observable<models.GetCarResult> {
    const filePath = `${sqlPath}/select-car.sql`;
    const placeHolder = [
      params.name,
    ];

    return Database.transaction$(filePath, placeHolder).pipe(
      map((result: QueryResult) => {
        if (result.rowCount !== 1) { throw new Error(); }
        return {
          name: result.rows[0] ? result.rows[0].name : undefined,
          maker: result.rows[0] ? result.rows[0].maker : undefined,
        };
      }),
      catchError(() => {
        const err = {
          code: 404,
          message: "Not Found",
        };
        return throwError(err);
      }),
    );
  }

  public postCar$(params: models.PostCarParams): Observable<models.PostCarResult> {
    const filePath = `${sqlPath}/insert-car.sql`;
    const placeHolder = [
      params.name,
      params.maker,
    ];

    return Database.transaction$(filePath, placeHolder).pipe(
      map(() => ({
        name: params.name,
        maker: params.maker,
      })),
      catchError((error) => {
        const err = {
          code: 403,
          message: "Forbidden",
        };
        return throwError(err);
      }),
    );
  }

  public putCar$(params: models.PutCarParams): Observable<models.PutCarResult> {
    const filePath = `${sqlPath}/update-car.sql`;
    const placeHolder = [
      params.oldName,
      params.name,
      params.maker,
    ];

    return Database.transaction$(filePath, placeHolder).pipe(
      map(() => ({
        name: params.name,
        maker: params.maker,
      })),
      catchError(() => {
        const err = {
          code: 403,
          message: "Forbidden",
        };
        return throwError(err);
      }),
    );
  }

  public deleteCar$(params: models.DeleteCarParams): Observable<models.DeleteCarResult> {
    const filePath = `${sqlPath}/delete-car.sql`;
    const placeHolder = [
      params.name,
    ];

    return Database.transaction$(filePath, placeHolder).pipe(
      map(() => ({
        name: params.name,
      })),
      catchError(() => {
        const err = {
          code: 404,
          message: "Not Found",
        };
        return throwError(err);
      }),
    );
  }
}
