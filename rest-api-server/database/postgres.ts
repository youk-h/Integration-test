import * as fs from "fs";

import { of, throwError, from, Observable } from "rxjs";
import { mergeMap, catchError, finalize } from "rxjs/operators";

import { Pool, QueryResult, PoolClient } from "pg";

export class Database {
  public static connect$(): Observable<PoolClient> {
    const pool = new Pool({
      user: "postgres",
      password: "postgres",
      database: "postgres",
      host: "localhost",
      port: 5432,
    });

    return from(pool.connect());
  }

  public static transaction$(filePath: string, placeHolder: any[] = []): Observable<QueryResult> {
    const sql = fs.readFileSync(filePath).toString();

    return Database.connect$().pipe(
      mergeMap((client) => of(client).pipe(
        mergeMap(() => client.query("BEGIN")),
        mergeMap(() => from(client.query(sql, placeHolder)).pipe(
          mergeMap((response: QueryResult) => {
            client.query("COMMIT");
            return of(response);
          }),
        )),
        catchError((error) => {
          client.query("ROLLBACK");
          return throwError(error);
        }),
        finalize(() => client.release()),
      )),
    );
  }
}
