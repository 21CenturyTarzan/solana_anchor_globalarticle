use anchor_lang::prelude::*;

declare_id!("9SdvGeQLLYxBSfNsUi4ayVfx1rncukGoKzweD3EUpvKM");

#[program]
pub mod solana_global_article {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {

        // get the article
        let article_account = &mut ctx.accounts.article;
        // initialize the variable (required)
        article_account.content = ("").to_string();
        Ok(())
    }

    pub fn write_into_article(ctx: Context<WriteIntoArticle>, three_words: String)-> Result<()> {
        let article = &mut ctx.accounts.article;
        let split_iterator = three_words.trim().split(" ");

        let mut final_words = Vec::new();
        let mut counter_added = 0;
        for s in split_iterator {
            if s.trim().is_empty() {
                continue;
            }
            if s.trim().len() >= 15 {
                return Err(Errors::WordTooLong.into());
            }
            final_words.push(s);
            counter_added += 1;
            if counter_added >= 3 {
                break;
            }
        }

        let mut joined_words = final_words.join(" ");
        joined_words.push_str(" ");
        article.content.push_str(&joined_words);

        Ok(())
    }
}

#[account]
pub struct Article {
    pub content: String,
}


#[derive(Accounts)] /////// implementation of accounts deserializer which means that it allows this struct to process user addresses and accounts.
pub struct Initialize<'info> {  // this part is called when [#program] part is called.
    # [account (
        init,
        payer = person_that_pays,
        space = 8 +32 + 1000
    )]

    pub article: Account<'info, Article>,  // article is new data account

    #[account (mut)]
    pub person_that_pays: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// The first step when creating a function that updates blockchain data,
// is to create a struct with the variables you want to have updated like so:
#[derive(Accounts)]
pub struct WriteIntoArticle<'info> {
    #[account(mut)] //update data.
    pub article: Account<'info, Article>
}

#[error_code]
pub enum Errors {
    #[msg("Each word must be less than 15 characters")]
    WordTooLong,
}