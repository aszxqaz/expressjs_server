import loop from "./loop.js";
import { parentPort } from "worker_threads";

const res = loop();
parentPort.postMessage(res);
