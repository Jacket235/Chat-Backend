import type { RequestHandler } from "express";
import { broadcastChatMessage } from "./index.js";

export const getWSConfig: RequestHandler = (req, res) => {
    const host = req.get("host");
    if (!host) {
        res.status(500).json({ message: "Could not resolve websocket host." });
        return;
    }

    const wsProtocol = req.protocol === "https" ? "wss" : "ws";
    res.json({ ok: true, wsUrl: `${wsProtocol}://${host}/ws` });
};

export const postWSMessage: RequestHandler = (req, res) => {
    const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
    const clientId =
        typeof req.body?.clientId === "string" && req.body.clientId.trim()
            ? req.body.clientId.trim()
            : "server";

    if (!text) {
        res.status(400).json({ message: "text is required" });
        return;
    }

    broadcastChatMessage(text, clientId);
    res.status(200).json({ ok: true });
};