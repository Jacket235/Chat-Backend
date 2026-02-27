import { Router } from "express";
import { getWSConfig } from "./ws.controller.js";

export const wsRouter = Router()

wsRouter.get("/ws/config", getWSConfig)