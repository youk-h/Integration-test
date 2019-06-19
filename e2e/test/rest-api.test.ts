import * as path from "path";

import { RxHR } from "@akanass/rx-http-request";

import { Database } from "./database";

describe("rest-api", () => {
  const baseUrl = "http://localhost:3000";

  beforeAll((done) => {
    const sqlPath = `${path.join(__dirname, "delete.sql")}`;
    Database.transaction$(sqlPath).subscribe(
      () => { },
      () => process.exit(),
    ).add(done);
  });

  afterEach((done) => setTimeout(done, 1));

  describe("POST /cars should insert car data", () => {
    test("POST /cars should insert car data", (done) => {
      const body = {
        name: "demio",
        maker: "mazda",
      };

      RxHR.post(`${baseUrl}/cars`, { json: true, body }).subscribe(
        (response) => {
          expect(response.response.statusCode).toEqual(200);
          expect(response.body).toEqual(body);
        },
        (e) => fail(e),
      ).add(done);
    });

    test("GET /cars/demio should get car data", (done) => {
      const expected = {
        name: "demio",
        maker: "mazda",
      };

      RxHR.get(`${baseUrl}/cars/demio`, { json: true }).subscribe(
        (response) => {
          expect(response.response.statusCode).toBe(200);
          expect(response.body).toEqual(expected);
        },
        (e) => fail(e),
      ).add(done);
    });
  });

});
