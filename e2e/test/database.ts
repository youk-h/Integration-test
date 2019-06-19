import * as fs from "fs";

import { Observable, from, of } from "rxjs";
import { catchError, finalize, map, mergeMap } from "rxjs/operators";
import { Pool, PoolClient, QueryResult } from "pg";

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
            return from(client.query("COMMIT")).pipe(
              map((data) => data),
            );
          }),
        )),
        catchError((error) => from(client.query("ROLLBACK")).pipe(
          map(() => { throw error }))
        ),
        finalize(() => client.release()),
      )),
    );
  }
}
