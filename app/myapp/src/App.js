import logo from './logo.svg';
import './App.css';
import { Paper, Skeleton, TextField, Button } from '@mui/material'
import WalletContext from './WalletContext'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'

import idl from './IDL/solana_global_article.json'
import { Program, AnchorProvider, web3 } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import config from './config'


function App() {

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [solanaArticle, setSolanaArticle] = useState('')
  const wallet = useAnchorWallet()
  const { connection } = useConnection()
  const programID = new PublicKey("9SdvGeQLLYxBSfNsUi4ayVfx1rncukGoKzweD3EUpvKM")
  const { SystemProgram, Keypair } = web3

  const checkAndAddWords = e => {
    let words = e.target.value.split(' ')
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 15) {
        return
      }
    }
    if (words.length > 5) return
    setInputValue(words.join(' '))
  }


  const initialize = async () => {
    const provider = new AnchorProvider(connection, wallet, {})
    const program = new Program(idl, programID, provider)
    const keypairOne = Keypair.generate()
    try {
      await program.rpc.initialize({
        accounts: {
          person_that_pays: provider.wallet.publicKey,
          article: keypairOne.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [keypairOne],
      })
      console.log('done', keypairOne.publicKey.toString())
    } catch (e) {
      console.log('#1', e)
      return alert(e)
    }
  }

  return (
    <>
      <header className='header'>
        {/* <img src='assets/solana.jpeg' className='solana-image' /> */}
        <div className="title-container">
          <h1 className="main-title">Open Global Book</h1>
          <h4 className="main-subtitle">By Merunas</h4>
        </div>
        <div className="wallet-connect">
          <WalletMultiButton />
        </div>
      </header>
      <Paper elevation={20} className='content-box'>
        <Skeleton variant='text' />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
      </Paper>
      <div className="three-words-input-container">
        <TextField
          id='outlined-basic'
          label='Write to the open book (5 words max)'
          variant='outlined'
          value={inputValue}
          className='words-input'
          onChange={e => checkAndAddWords(e)}
        />
        <Button variant="contained" className="submit-button" onClick={initialize}>Submit</Button>
      </div>
    </>
  );
}

export default () => {
  return (
    <WalletContext>
      <App />
    </WalletContext>
  )
}
