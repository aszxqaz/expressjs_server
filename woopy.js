import { EtherscanProvider, Wallet, getDefaultProvider } from "ethers";
import * as fs from "fs";
import ApiKeys from "./api_keys.js";

const words = fs.readFileSync("words.txt").toString().split(" ");
const date = Date.now();
const outputFileName = `output-${date}.txt`;

process.on("close", () => {
  process.exit();
});

// fs.writeFileSync(outputFileName, "", {
//   encoding: "ascii",
// });
let a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  k,
  l,
  m,
  n = 0;
let startIndeces = Array(12)
  .fill(0)
  .map((a) => Math.trunc(Math.random() * words.length));

let step = 0;
let isStarted = false;

const startDate = Date.now();
for (a = startIndeces[0]; a < words.length; a++) {
  if ([b, c, d, e, f, g, h, k, l, m, n].includes(a)) continue;
  for (b = startIndeces[1]; b < words.length; b++) {
    if ([a, c, d, e, f, g, h, k, l, m, n].includes(b)) continue;
    for (c = startIndeces[2]; c < words.length; c++) {
      if ([a, b, d, e, f, g, h, k, l, m, n].includes(c)) continue;
      for (d = startIndeces[3]; d < words.length; d++) {
        if ([a, b, c, e, f, g, h, k, l, m, n].includes(d)) continue;
        for (e = startIndeces[4]; e < words.length; e++) {
          if ([a, b, c, d, f, g, h, k, l, m, n].includes(e)) continue;
          for (f = startIndeces[5]; f < words.length; f++) {
            if ([a, b, c, d, e, g, h, k, l, m, n].includes(f)) continue;
            for (g = startIndeces[6]; g < words.length; g++) {
              if ([a, b, c, d, e, f, h, k, l, m, n].includes(g)) continue;
              for (h = startIndeces[7]; h < words.length; h++) {
                if ([a, b, c, d, e, f, g, k, l, m, n].includes(h)) continue;
                for (k = startIndeces[8]; k < words.length; k++) {
                  if ([a, b, c, d, e, f, g, h, l, m, n].includes(k)) continue;
                  for (l = startIndeces[9]; l < words.length; l++) {
                    if ([a, b, c, d, e, f, g, h, k, m, n].includes(l)) continue;
                    for (m = startIndeces[10]; m < words.length; m++) {
                      if ([a, b, c, d, e, f, g, h, k, l, n].includes(m))
                        continue;
                      for (n = startIndeces[11]; n < words.length; n++) {
                        if ([a, b, c, d, e, f, g, h, k, l, m].includes(n))
                          continue;
                        // if (a == 0 && b == 0 && c == 0 && d == 0 && e == 0 && f == 0 && g == 0
                        //   && h == 0 && k == 0 && l == 0) continue;
                        const phrase = `${words[a]} ${words[b]} ${words[c]} ${words[d]} ${words[e]} ${words[f]} ${words[g]} ${words[h]} ${words[k]} ${words[l]} ${words[m]} ${words[n]}`;
                        if (!isStarted) {
                          isStarted = !isStarted;
                          console.log(
                            `Started at ${new Date().toLocaleString()} with the phrase: \n${phrase}\n...\n`
                          );
                        }
                        try {
                          const wallet = Wallet.fromPhrase(phrase);
                          const provider = new EtherscanProvider(
                            undefined,
                            ApiKeys.getRandom()
                          );
                          const address = await wallet.getAddress();
                          const balance = await provider.getBalance(address);
                          step++;
                          if (step % 100 == 0)
                            console.log(
                              `${step} wallets have checked on Ethernet... Average speed: ${(
                                (step / (Date.now() - startDate)) *
                                1000 *
                                60
                              ).toFixed(2)} wallets / min.`
                            );
                          if (balance > 0) {
                            console.log(
                              `Phrase: ${phrase}\nAddress: ${address}\nBalance: ${balance}\n###\n`
                            );
                            // fs.appendFileSync(
                            //   outputFileName,
                            //   "******* WOW *******"
                            // );
                            // fs.appendFileSync(
                            //   outputFileName,
                            //   "******* WOW *******"
                            // );
                            // fs.appendFileSync(
                            //   outputFileName,
                            //   "******* WOW *******"
                            // );
                            // fs.appendFileSync(
                            //   outputFileName,
                            //   "******* WOW *******"
                            // );
                            // fs.appendFileSync(
                            //   outputFileName,
                            //   `Phrase: ${phrase}\nAddress: ${address}\nBalance: ${balance}\n###\n`
                            // );
                            // fs.appendFileSync(
                            //   outputFileName,
                            //   "******* WOW *******"
                            // );
                            // fs.appendFileSync(
                            //   outputFileName,
                            //   "******* WOW *******"
                            // );
                            // fs.appendFileSync(
                            //   outputFileName,
                            //   "******* WOW *******"
                            // );
                            // fs.appendFileSync(
                            //   outputFileName,
                            //   "******* WOW *******"
                            // );
                          }
                        } catch (e) {}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
