import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import product from "./product/product.network";
import user from "./user/user.network";

export class App {

    private app: Application;

    constructor(private port?: number | string) {
        this.app = express()
        this.port = port;
        this.settings();
        this.middelware();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.port || 9000);
    }

    middelware() {
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes() {
        this.app.use("/api/product", product);
        this.app.use("/api/auth", user);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`Listen on port`, this.app.get('port'));
    }
}