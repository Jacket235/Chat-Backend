import express from "express"
import cors from "cors"

export function createApp() {
    const app = express()

    app.use(
        cors({
            origin: "http://localhost:5174",
            credentials: true,
        })
    );

    return app
}