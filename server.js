import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();

const parts = html.split("not rendered");

const app = express();
app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

app.use((request, response) => {
  response.write(parts[0]);

  const stream = renderApp(request.url, {
    onShellReady() {
      stream.pipe(response);
    },
    onShellError() {
      // do error handling here
    },
    onAllReady() {
      // last thing to write
      response.write(parts[1]);
      response.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
