import { randomUUID } from "node:crypto";
import type { Server } from "node:http";
import { WebSocketServer } from "ws";

export function attachWebSocket(server: Server) {
    const wss = new WebSocketServer({ server })

    wss.on("connection", () => {
        const clientId = randomUUID()
        // eslint-disable-next-line no-console
        console.log(`connected ${clientId}`)
    });

    return wss;
}
