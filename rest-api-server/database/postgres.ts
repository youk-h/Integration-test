import * as fs from "fs";

import { of, from, Observable } from "rxjs";
import { mergeMap, catchError, finalize, map } from "rxjs/operators";

import { Pool, QueryResult, PoolClient } from "pg";

export class Database {
  public static connect$(): Observable<PoolClient> {
    const pool = new Pool({
      user: "postgres",
      password: "postgres",
      database: "postgres",
      host: "postgres-e2e",
      port: 5432,
    });

    return from(pool.connect());
  }

  public static transaction$(filePath: string, placeHolder: any[] = []): Observable<QueryResult> {
    const sql = fs.readFileSync(filePath).toString();

    return Database.connect$().pipe(
      mergeMap((client) => of(client).pipe(
        mergeMap(() => client.query("BEGIN")),
        mergeMap(() => from(client.query(sql, placeHolder))),
        mergeMap((response: QueryResult) => {
          return from(client.query("COMMIT")).pipe(
            map(() => response),
          );
        }),
        catchError((error) => from(client.query("ROLLBACK")).pipe(
          map(() => { throw error }))
        ),
        finalize(() => client.release()),
      )),
    );
  }
}
