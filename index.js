import { exec, spawn } from "child_process";
import {
  COUNT_TO_LOG_BY_PARENT,
  COUNT_TO_INFORM_PARENT,
  FAKE_TEST_WALLET_COUNT,
} from "./constants.js";

const index = process.argv.findIndex((_) => _.includes("count="));
const string = process.argv[index];
export const CHILDS_COUNT = 30;
  // parseInt(string.slice(string.indexOf("=") + 1)) || 20;

let walletsCount = 0;
const startDate = Date.now();
const walletsFound = [];

let lastDate = startDate;
let lastCount = 0;
let newMaximumCount = COUNT_TO_INFORM_PARENT;
let countStep = COUNT_TO_INFORM_PARENT;
let phraseBuiltTimes = 0;

console.log(`App started at ${new Date().toLocaleString()}`);

for (let i = 0; i < CHILDS_COUNT; i++) {
  const a = exec("node woopy.js", {}).on("spawn", () => {
    console.log(`Child process ${a.pid} started`);
  });

  a.stdout.on("data", (data) => {
    const msg = JSON.parse(data);

    if (msg.walletFound) {
      walletsFound.push(msg.walletFound);
    }

    if (msg.count) {
      walletsCount += msg.count;
      phraseBuiltTimes += msg.phrases;
    }

    if (walletsCount >= newMaximumCount) {
      console.log(
        `${walletsCount.toLocaleString()} wallets scanned on Etherscan...`
      );
      console.log(`${phraseBuiltTimes.toLocaleString()} phrases built...`);
      console.log(`Instances up: ${CHILDS_COUNT}`);

      const avgSpeed = (walletsCount / (Date.now() - startDate)) * 1000 * 60;
      const curSpeed =
        ((walletsCount - lastCount) / (Date.now() - lastDate)) * 1000 * 60;

      lastCount = walletsCount;
      lastDate = Date.now();

      // console.log(`Current speed: ${curSpeed.toFixed(2)} wallets / min.`);
      console.log(`Average speed: ${Math.trunc(avgSpeed)} wallets / min.`);
      console.log(`Wallets found: ${JSON.stringify(walletsFound)}`);
      console.log("...");

      newMaximumCount += countStep;
    }
  });
}
