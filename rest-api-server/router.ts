import * as express from "express";
import * as restApi from "./handler/rest-api";

const app = express();
const port = 3000;

const restApiRouter = express.Router();

app.use(express.json());

app.all("*", restApiRouter);

restApiRouter.get("/cars/:name", restApi.getHandler);
restApiRouter.post("/cars", restApi.postHandler);
restApiRouter.put("/cars/:name", restApi.putHandler);
restApiRouter.delete("/cars/:name", restApi.deleteHandler);

app.listen(port, () => console.log(`listen to ${port}`));
