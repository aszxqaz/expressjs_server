import * as fs from "fs";

export const WORDS = fs.readFileSync("words.txt").toString().split(" ");
export const COUNT_TO_INFORM_PARENT = 100;
export const COUNT_TO_LOG_BY_PARENT = 500;
export const FAKE_TEST_WALLET_COUNT = Infinity; 
