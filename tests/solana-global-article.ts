import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import { SolanaGlobalArticle } from "../target/types/solana_global_article";

describe("solana-global-article", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaGlobalArticle as Program<SolanaGlobalArticle>;

  it("Is initialized!", async () => {
    
    const deployerKeypair = anchor.web3.Keypair.generate()
    const personThatPays = provider.wallet
    // Add your test here
    await program.rpc.initialize({
      accounts: {
        article: deployerKeypair.publicKey,
        personThatPays: personThatPays.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [deployerKeypair],
    })
  });

  it("should write an article ", async () => {

    const deployerKeypair = anchor.web3.Keypair.generate()
    const personThatPays = provider.wallet
    // Add your test here
    await program.rpc.initialize({
      accounts: {
        article: deployerKeypair.publicKey,
        personThatPays: personThatPays.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [deployerKeypair],
    })

    await program.rpc.writeIntoArticle('hey', {
      accounts:{
        article: deployerKeypair.publicKey
      },
      signers: [],
    })

    const articleData = await program.account.article.fetch(deployerKeypair.publicKey)
    expect(articleData.content).to.equal('hey ')

  })

});
