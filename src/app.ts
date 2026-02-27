import express from "express"
import cors from "cors"
import { wsRouter } from "./ws/ws.routes.js";

export function createApp() {
    const app = express()

    app.use(
        cors({
            origin: "http://localhost:5174",
            credentials: true,
        })
    );

    app.use(wsRouter)

    return app
}