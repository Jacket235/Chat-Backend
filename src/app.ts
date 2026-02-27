import express from "express"
import cors from "cors"
import { wsRouter } from "./ws/ws.routes.js";

export function createApp() {
    const app = express()

    app.use(
        cors({
            origin: "http://localhost:5173", // http://192.168.10.64:5173
            credentials: true,
        })
    );

    app.use(wsRouter)
    app.use(express.json())

    return app
}