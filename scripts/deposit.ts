import {
  Connection, Keypair, PublicKey,
  Transaction, TransactionInstruction, sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, mintTo, getAccount,
} from "@solana/spl-token";
import fs from "fs";
import os from "os";

const PROGRAM_ID = new PublicKey("AUov6zyDFS4R86PtEMxeikWXfXAc5j6pHxXtZcPkjBRv");
const TOKEN_MINT = new PublicKey("5pTPEE31RcmUqmFJw57k17rGx6mBTvbYJUqRGZ4erMKG");
const VAULT = new PublicKey("HyxdbjCrUaU6JSdNKVvNWNJmgr7J7FCkQCgb8Hut7mjK");
const SHARE_MINT = new PublicKey("HVt9UCkQ7aVgujdvgW5rs4x32Ckr9xEeZMqjKSNLQp9W");
const VAULT_TOKEN = new PublicKey("EUTxbHc2DhM9h79V8B6seSYLkkoBNmWR1YsqWzfaFiiV");
const POSITION = new PublicKey("CdeERQm9Z2VfTFMsqMHDwEXBsnGdmKGZDV2faR8Bijqn");

const secret = JSON.parse(fs.readFileSync(os.homedir() + "/.config/solana/id.json", "utf8"));
const user = Keypair.fromSecretKey(Uint8Array.from(secret));
const conn = new Connection("https://api.devnet.solana.com", "confirmed");

const amountUi = Number(process.argv[2] ?? "10");
const amount = BigInt(Math.round(amountUi * 1_000_000));

const userToken = await getOrCreateAssociatedTokenAccount(conn, user, TOKEN_MINT, user.publicKey);
const userShare = await getOrCreateAssociatedTokenAccount(conn, user, SHARE_MINT, user.publicKey);
await mintTo(conn, user, TOKEN_MINT, userToken.address, user, amount);
console.log("Minted test tokens:", amountUi);

const idl = JSON.parse(fs.readFileSync("../target/idl/liquidity_vault.json", "utf8"));
const ix = idl.instructions.find((i: any) => i.name === "deposit");
const data = Buffer.alloc(16);
Buffer.from(ix.discriminator).copy(data, 0);
data.writeBigUInt64LE(amount, 8);

const instruction = new TransactionInstruction({
  programId: PROGRAM_ID,
  keys: [
    { pubkey: user.publicKey, isSigner: true, isWritable: true },
    { pubkey: VAULT, isSigner: false, isWritable: true },
    { pubkey: SHARE_MINT, isSigner: false, isWritable: true },
    { pubkey: VAULT_TOKEN, isSigner: false, isWritable: true },
    { pubkey: userToken.address, isSigner: false, isWritable: true },
    { pubkey: userShare.address, isSigner: false, isWritable: true },
    { pubkey: POSITION, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ],
  data,
});

const sig = await sendAndConfirmTransaction(conn, new Transaction().add(instruction), [user]);

const bal = async (a: PublicKey) => Number((await getAccount(conn, a)).amount) / 1e6;
const vaultInfo = await conn.getAccountInfo(VAULT);
const posInfo = await conn.getAccountInfo(POSITION);
console.log("Deposited:", amountUi);
console.log("User tokens:      ", await bal(userToken.address));
console.log("User share-tokens:", await bal(userShare.address));
console.log("Vault tokens:     ", await bal(VAULT_TOKEN));
console.log("vault.total_deposited:   ", Number(vaultInfo!.data.readBigUInt64LE(136)) / 1e6);
console.log("position.deposited:      ", Number(posInfo!.data.readBigUInt64LE(72)) / 1e6);
console.log("TX:", `https://explorer.solana.com/tx/${sig}?cluster=devnet`);
