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