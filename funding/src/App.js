import { useState,useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {

  const[web3Api,setWeb3Api] = useState({
    provider:null,
    web3:null
  })

  const[account,setAccount] = useState(null);
  useEffect(() => {
    const loadProvider = async() => {
      console.log(window.web3)
      console.log(window.ethereum)
      let provider = null;
      if(window.ethereum){
        provider = window.ethereum;
        try{
          await provider.enable();
        }
        catch{
          console.error("User is not allowed");
        }
      }
      else if(window.web3){
        provider= window.web3.currentProvider;
      }
      else if(!process.env.production){
        provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      setWeb3Api({
        web3:new Web3(provider),
        provider
      })
    };
    loadProvider();
  },[]);

  useEffect(()=>{
    const getAccounts = async() =>{
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3&& getAccounts()
  },[web3Api.web3])
  console.log(web3Api.web3)
  return (
    <>
    <div class="card text-center">
      <div class="card-header">Funding</div>
      <div class="card-body">
        <h5 class="card-title">Balance:  ETH </h5>
        <p class="card-text">
          Account : {account ? account:"Not Connected" }
        </p>
        {/* <button
          type="button"
          class="btn btn-success"
          onClick={async () => {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log(accounts);
          }}
        >
          Connect to metamask
        </button> */}
        &nbsp;
        <button type="button" class="btn btn-success " >
          Transfer
        </button>
        &nbsp;
        <button type="button" class="btn btn-primary " >
          Withdraw
        </button>
      </div>
      <div class="card-footer text-muted">Code Eater</div>
    </div>
  </>
  );
}

export default App;
