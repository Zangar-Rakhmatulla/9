import {
  Connection, Keypair, PublicKey, SystemProgram,
  Transaction, TransactionInstruction, sendAndConfirmTransaction,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import fs from "fs";
import os from "os";

const PROGRAM_ID = new PublicKey("AUov6zyDFS4R86PtEMxeikWXfXAc5j6pHxXtZcPkjBRv");
const TOKEN_MINT = new PublicKey("5pTPEE31RcmUqmFJw57k17rGx6mBTvbYJUqRGZ4erMKG");

const secret = JSON.parse(fs.readFileSync(os.homedir() + "/.config/solana/id.json", "utf8"));
const admin = Keypair.fromSecretKey(Uint8Array.from(secret));
const conn = new Connection("https://api.devnet.solana.com", "confirmed");

const idl = JSON.parse(fs.readFileSync("../target/idl/liquidity_vault.json", "utf8"));
const ix = idl.instructions.find((i: any) => i.name === "initialize_vault");
const data = Buffer.from(ix.discriminator);

const [vault] = PublicKey.findProgramAddressSync([Buffer.from("vault"), TOKEN_MINT.toBuffer()], PROGRAM_ID);
const [shareMint] = PublicKey.findProgramAddressSync([Buffer.from("share_mint"), vault.toBuffer()], PROGRAM_ID);
const [vaultToken] = PublicKey.findProgramAddressSync([Buffer.from("vault_token"), vault.toBuffer()], PROGRAM_ID);

const instruction = new TransactionInstruction({
  programId: PROGRAM_ID,
  keys: [
    { pubkey: admin.publicKey, isSigner: true, isWritable: true },
    { pubkey: TOKEN_MINT, isSigner: false, isWritable: false },
    { pubkey: vault, isSigner: false, isWritable: true },
    { pubkey: shareMint, isSigner: false, isWritable: true },
    { pubkey: vaultToken, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
  ],
  data,
});

const sig = await sendAndConfirmTransaction(conn, new Transaction().add(instruction), [admin]);
console.log("VAULT PDA:       ", vault.toBase58());
console.log("SHARE MINT PDA:  ", shareMint.toBase58());
console.log("VAULT TOKEN PDA: ", vaultToken.toBase58());
console.log("TX:", `https://explorer.solana.com/tx/${sig}?cluster=devnet`);
