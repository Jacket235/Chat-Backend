import { createApp } from "./app.js";
import { attachWebSocket } from "./ws/index.js";

const app = createApp()
const PORT = 3000

const server = app.listen(PORT, "0.0.0.0", () => {
    // eslint-disable-next-line no-console
    console.log(`API listening: http://localhost:${PORT}`)
});
attachWebSocket(server);