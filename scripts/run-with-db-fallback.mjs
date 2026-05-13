import net from "node:net";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf8");
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index <= 0) continue;

    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) process.env[key] = value;
  }
}

function getHostPort(urlString) {
  const url = new URL(urlString);
  const port = Number(url.port || 5432);
  return { host: url.hostname, port };
}

function canConnect(urlString, timeoutMs = 1200) {
  return new Promise((resolve) => {
    try {
      const { host, port } = getHostPort(urlString);
      const socket = net.createConnection({ host, port });

      const done = (ok) => {
        socket.removeAllListeners();
        socket.destroy();
        resolve(ok);
      };

      socket.setTimeout(timeoutMs);
      socket.once("connect", () => done(true));
      socket.once("timeout", () => done(false));
      socket.once("error", () => done(false));
    } catch {
      resolve(false);
    }
  });
}

async function main() {
  loadDotEnv();

  const localUrl = process.env.DATABASE_URL_LOCAL || process.env.DATABASE_URL;
  const remoteUrl = process.env.DATABASE_URL_REMOTE;

  if (!localUrl || !remoteUrl) {
    console.warn("[db-fallback] DATABASE_URL_LOCAL / DATABASE_URL_REMOTE is missing, using DATABASE_URL.");
  } else if (await canConnect(localUrl)) {
    process.env.DATABASE_URL = localUrl;
    console.log("[db-fallback] Using LOCAL PostgreSQL");
  } else {
    process.env.DATABASE_URL = remoteUrl;
    console.log("[db-fallback] Local DB unreachable, fallback to REMOTE PostgreSQL");
  }

  const [command, ...args] = process.argv.slice(2);
  if (!command) {
    console.error("[db-fallback] No command provided.");
    process.exit(1);
  }

  const child = spawn(command, args, {
    stdio: "inherit",
    env: process.env
  });

  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    else process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error("[db-fallback] Failed to initialize DB fallback:", error);
  process.exit(1);
});
