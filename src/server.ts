import { createApp } from "./app.js";

const app = createApp();
const PORT = 3000

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening: http://localhost:${PORT}`);
});