import { Connection, Keypair } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import fs from "fs";
import os from "os";

const secret = JSON.parse(
  fs.readFileSync(os.homedir() + "/.config/solana/id.json", "utf8")
);
const payer = Keypair.fromSecretKey(Uint8Array.from(secret));
const conn = new Connection("https://api.devnet.solana.com", "confirmed");

const mint = await createMint(conn, payer, payer.publicKey, null, 6);
console.log("TOKEN MINT:", mint.toBase58());
