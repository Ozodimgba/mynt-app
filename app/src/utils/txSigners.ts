import {
    Connection,
    Signer,
    Transaction,
    VersionedTransaction,
  } from "@solana/web3.js";

  function getRawTransaction(
    encodedTransaction: string
  ): Transaction | VersionedTransaction {
    let recoveredTransaction: Transaction | VersionedTransaction;
    try {
      recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, "base64")
      );
    } catch (error) {
      recoveredTransaction = VersionedTransaction.deserialize(
        Buffer.from(encodedTransaction, "base64")
      );
    }
    return recoveredTransaction;
  }

export async function signTransactionFromFrontend(
    encodedTransaction: string,
    signers: Array<Signer>
  ): Promise<string> {
    const recoveredTransaction = getRawTransaction(encodedTransaction);
    let serializedTransaction: Uint8Array | Buffer;
  
    if (recoveredTransaction instanceof VersionedTransaction) {
      recoveredTransaction.sign(signers);
      serializedTransaction = recoveredTransaction.serialize();
    } else {
      recoveredTransaction.partialSign(...signers);
      serializedTransaction = recoveredTransaction.serialize({
        requireAllSignatures: false,
      });
    }

    const transactionBase64 = Buffer.from(serializedTransaction).toString(
        "base64"
      );
      return transactionBase64;
  }