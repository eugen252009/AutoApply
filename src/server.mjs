import express from "express";
import { routes } from "./routes/routes.mjs";
import { logger } from "./index.mjs";

export class Server {
    constructor() {
        this.App = express();
        this.App.use(express.json({}))
        this.initRoutes();
    }
    initRoutes() {
        this.App.route("/generate").all(routes.generate)
        this.App.route("/response").get(routes.response)
        this.App.route("/").all(routes.indexRoute)
    }
    start() {
        this.App.listen(8080, () => {
            logger.log("Server started...")
        })
    }

}