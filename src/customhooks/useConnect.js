import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ABI } from '../Assets/ABI';

function useConnect(bool) {
    const [status, setStatus] = useState(false);
    if (bool === true) {
        setStatus(!status);
    }

    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);

    // ether
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);



    // useEffect(() => {
    const handelConnectWallet = async () => {
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

    const updateEther = () => {
        let tempProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
        let tempSigner = tempProvider.getSigner();
        let tempContract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, ABI, tempProvider);

        setProvider(tempProvider);
        setSigner(tempSigner);
        setContract(tempContract);
    }
    if (status === true) {
        handelConnectWallet();
    }
    // }, [bool]);

    return { account, provider, signer, contract, error }
}

export default useConnect;
