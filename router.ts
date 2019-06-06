import * as express from "express";
import * as restApi from "./rest-api";

const app = express();
const port = 3000;

const restApiRouter = express.Router();

app.all("*", restApiRouter);

restApiRouter.get("/cars", restApi.getHandler);
restApiRouter.post("/cars", restApi.postHandler);
restApiRouter.put("/cars", restApi.putHandler);
restApiRouter.delete("/cars", restApi.deleteHandler);

app.listen(port, () => console.log(`listen to ${port}`));
