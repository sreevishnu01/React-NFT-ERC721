import React, { Component } from 'react';

export class Wallet {
    constructor() {
        super();
        this.state = {

        }
    }
    handelConnect = async () => {
        try {
            if (!window.ethereum)
                throw new Error('metamask not found..');
            const result = await window.ethereum.request({ method: 'eth_requestAccounts' })
            if (result) {
                setAccount(result[0]);
                // setConnection('connected');
                updateEther();
            }

        } catch (err) {
            setError(err.message);
        }
    }
    updateEther = () => {
        let tempProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
        let tempSigner = tempProvider.getSigner();
        let tempContract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, ABI, tempProvider);

        setProvider(tempProvider);
        setSigner(tempSigner);
        setContract(tempContract);
    }

}

export default Wallet;
