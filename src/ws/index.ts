import { randomUUID } from "node:crypto";
import type { Server } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

type Client = {
    clientID: string,
    username: string;
}

type WSOutgoing =
    | { type: "connected", clientID: string, username: string }
    | { type: "user_joined", clientID: string, username: string }
    | { type: "chat_message", clientID: string, username: string, text: string }
    | { type: "user_left", clientID: string, username: string }

const clients = new Map<WebSocket, Client>()

function sendJSON(socket: WebSocket, payload: WSOutgoing ) {
    if (socket.readyState !== WebSocket.OPEN) return

    socket.send(JSON.stringify(payload))
}

function broadcast(payload: WSOutgoing) {
    clients.forEach((_id, socket) => sendJSON(socket, payload));
}

export function broadcastChatMessage(text: string, clientID = "server", username = clientID) {
    broadcast({ type: "chat_message", clientID, username, text });
}

export function attachWebSocket(server: Server) {
    const wss = new WebSocketServer({ server })

    wss.on("connection", (socket, req) => {
        const clientID = randomUUID()
        const url = new URL(req.url ?? "", "ws://localhost")
        const username = url.searchParams.get("username")?.trim() || clientID
        
        broadcast({ type: "user_joined", clientID, username })
        clients.set(socket, { clientID, username })

        sendJSON(socket, { type: "connected", clientID, username })

        socket.on("message", (raw) => {
            const data = JSON.parse(raw.toString())
            if (data.type !== "chat_message") return

            const text = data.text.trim()
            broadcast({ type: "chat_message", clientID, username, text })
        })

        socket.on("close", () => {
            clients.delete(socket)
            broadcast({ type: "user_left", clientID, username })
        });
    });

    return wss;
}
