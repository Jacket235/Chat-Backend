import { randomUUID } from "node:crypto";
import type { Server } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

type WSOutgoing =
    | { type: "connected"; clientID: string }
    | { type: "user_joined"; clientID: string }
    | { type: "chat_message"; clientID: string; text: string }
    | { type: "user_left"; clientID: string }

const clients = new Map<WebSocket, string>()

function sendJSON(socket: WebSocket, payload: WSOutgoing ) {
    if (socket.readyState !== WebSocket.OPEN) return

    socket.send(JSON.stringify(payload))
}

function broadcast(payload: WSOutgoing) {
    clients.forEach((_id, socket) => sendJSON(socket, payload));
}

export function broadcastChatMessage(text: string, clientID = "server") {
    broadcast({ type: "chat_message", clientID, text });
}

export function attachWebSocket(server: Server) {
    const wss = new WebSocketServer({ server })

    wss.on("connection", (socket) => {
        const clientID = randomUUID()
        
        broadcast({ type: "user_joined", clientID })
        clients.set(socket, clientID)

        sendJSON(socket, { type: "connected", clientID })

        socket.on("message", (raw) => {
            const data = JSON.parse(raw.toString())
            if (data.type !== "chat_message") return

            const text = data.text.trim()
            broadcast({ type: "chat_message", clientID, text })
        })

        socket.on("close", () => {
            clients.delete(socket)
            broadcast({ type: "user_left", clientID })
        });
    });

    return wss;
}
