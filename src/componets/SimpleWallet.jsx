import React, { useEffect, useState } from 'react';
import './simple.css';
import { ethers } from 'ethers';
import { ABI } from '../Assets/ABI';
// import useConnect from '../customhooks/useConnect';

function SimpleWallet() {
    // env
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const token_ABI = ABI;
    // express salute fog program result grit hybrid lucky elephant edgeactachieve

    const [account, setAccount] = useState(null);
    const [tokenName, setTokenName] = useState(null);
    const [balance, setBalance] = useState([]);
    // const [connection, setConnection] = useState('connect');
    const [tokens, setTokens] = useState([]);
    const [error, setError] = useState(null);

    // ether
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    const handelConnectWallet = async () => {
        try {
            if (!window.ethereum)
                throw new Error('metamask not found..');
            const result = await window.ethereum.request({ method: 'eth_requestAccounts' })
            if (result) {
                setAccount(result[0]);
                updateBalance(result[0]);
                updateOwnTokens(result[0]);
            }


        } catch (err) {
            setError(err.message);
        }

    }
    const handelDisconnect = () => {
        if (account) {
            setAccount(null);
            setBalance(null);
            setTokens([])
        }
    }


    const updateBalance = async (account) => {
        try {
            let balanceBig = await contract.balanceOf(account);
            // let balanceNumber = await balanceBig.toNumber();
            setBalance(ethers.utils.formatEther(balanceBig))

        } catch (error) {
            setError(error)
        }
        // let decimal = await contract.decimals();
        // let tokenBalance = balanceNumber / Math.pow(10, decimal);
        // updateTokenName();
    }
    // const updateTokenName = async () => {
    //     // setTokenName(await contract.name())
    //     contract.methods.userOwnedTokens.call(account)
    // }
    const updateOwnTokens = async (account) => {
        // await ERC721.methods.userOwnedTokens.call(walletAddress)
        // let result = await contract.userOwnedTokens.call(account);
        try {
            let index = 0
            let result = []
            while (index < 20) {
                const data = await contract.tokenOfOwnerByIndex(account, index);
                const data1 = await contract.tokenURI(data)

                result.push(data1);
                index++;
            }
            setTokens(result)

        } catch (err) {
            setError(err)
        }

    }
    useEffect(() => {
        const updateEther = async () => {
            let tempProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
            let tempSigner = tempProvider.getSigner();
            let tempContract = new ethers.Contract(contractAddress, token_ABI, tempProvider);

            setContract(tempContract);
            setProvider(tempProvider);
            setSigner(tempSigner);
            console.log('ehter')

        }
        updateEther();
    }, [])

    return (
        <>
            <div className="container">
                <div className="cont-button">
                    <button onClick={account ? handelDisconnect : handelConnectWallet} >{account ? 'conected' : 'connect'}</button>
                </div>
                <div>
                    <h1>account:{account}</h1>
                    <h1>balance:{balance}</h1>
                    {/* <h1>token name:{tokenName}</h1> */}
                </div>
                <h1>{error}</h1>
                <button onClick={updateOwnTokens}>update</button>
                {tokens.map((e, index) => (
                    <p key={index}>{e}</p>
                ))}
            </div>

        </>
    );
}

export default SimpleWallet;
