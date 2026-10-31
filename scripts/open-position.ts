import {
  Connection, Keypair, PublicKey, SystemProgram,
  Transaction, TransactionInstruction, sendAndConfirmTransaction,
} from "@solana/web3.js";
import fs from "fs";
import os from "os";

const PROGRAM_ID = new PublicKey("AUov6zyDFS4R86PtEMxeikWXfXAc5j6pHxXtZcPkjBRv");
const VAULT = new PublicKey("HyxdbjCrUaU6JSdNKVvNWNJmgr7J7FCkQCgb8Hut7mjK");

const secret = JSON.parse(fs.readFileSync(os.homedir() + "/.config/solana/id.json", "utf8"));
const user = Keypair.fromSecretKey(Uint8Array.from(secret));
const conn = new Connection("https://api.devnet.solana.com", "confirmed");

const idl = JSON.parse(fs.readFileSync("../target/idl/liquidity_vault.json", "utf8"));
const ix = idl.instructions.find((i: any) => i.name === "open_position");
const data = Buffer.from(ix.discriminator);

const [position] = PublicKey.findProgramAddressSync(
  [Buffer.from("position"), VAULT.toBuffer(), user.publicKey.toBuffer()],
  PROGRAM_ID
);

const instruction = new TransactionInstruction({
  programId: PROGRAM_ID,
  keys: [
    { pubkey: user.publicKey, isSigner: true, isWritable: true },
    { pubkey: VAULT, isSigner: false, isWritable: false },
    { pubkey: position, isSigner: false, isWritable: true },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
  ],
  data,
});

const sig = await sendAndConfirmTransaction(conn, new Transaction().add(instruction), [user]);
console.log("USER POSITION PDA:", position.toBase58());
console.log("TX:", `https://explorer.solana.com/tx/${sig}?cluster=devnet`);
