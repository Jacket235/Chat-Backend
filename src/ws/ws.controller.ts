import type { RequestHandler } from "express";

export const getWSConfig: RequestHandler = (req, res) => {
    const host = req.get("host");
    if (!host) {
        res.status(500).json({ message: "Could not resolve websocket host." });
        return;
    }

    const wsProtocol = req.protocol === "https" ? "wss" : "ws";
    res.json({ ok: true, wsUrl: `${wsProtocol}://${host}/ws` });
};
