import { Router } from "express";
import { getWSConfig, postWSMessage } from "./ws.controller.js";

export const wsRouter = Router()

wsRouter.get("/ws/config", getWSConfig)
wsRouter.post("/ws/message", postWSMessage)