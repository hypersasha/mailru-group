import * as express from "express";
import {Routes} from "./Routes";

class NetworkLayer {

    public app: express.Application;
    public routesMap: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routesMap.routes(this.app);
    }

    private config(): void {
        //example of function
    }

}

export default new NetworkLayer().app;