import { randomUUID } from "node:crypto";
import type { Server } from "node:http";
import { WebSocketServer } from "ws";

export function attachWebSocket(server: Server) {
    const wss = new WebSocketServer({ server })

    wss.on("connection", (socket) => {
        const clientId = randomUUID()
        console.log(`connected ${clientId}`)
    
        socket.send(JSON.stringify({ type: "connected", clientId }));
    });

    return wss;
}
