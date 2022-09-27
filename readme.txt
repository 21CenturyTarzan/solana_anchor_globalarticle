original github url:   https://github.com/merlox/solana-world-article
tutorial url:          https://merunasgrincalaitis.medium.com/the-ultimate-solana-step-by-step-guide-including-programs-dapps-and-rust-from-scratch-d3bfb02b5f2e


anchor init

anchor build

anchor test

   // please update the anchor.toml file 
   [provider]
   cluster = "devnet"

   [programs.devnet]
   solana_global_article = "9SdvGeQLLYxBSfNsUi4ayVfx1rncukGoKzweD3EUpvKM"

   in order to test in localnet
   export BROWSER=
   anchor test



in order to get the program id 
  solana address -k target/deploy/solana_global_article-keypair.json