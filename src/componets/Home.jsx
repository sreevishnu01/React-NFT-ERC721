import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { walletConnect } from '../redux/wallet'
import { ethers } from 'ethers';
import Transfer from './Transfer';

function Home(props) {

    // redux
    const dispatch = useDispatch();
    const [ac, setAc] = useState(null);
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);

    const handelConnectWallet = async (e) => {
        e.preventDefault();
        try {
            if (!window.ethereum)
                throw new Error('metamask not found..');
            const result = await window.ethereum.request({ method: 'eth_requestAccounts' })
            if (result) {
                setAc(result[0])
                console.log(result[0])
                const bln = await updateBalance(result[0]);
                setBalance(bln)
                dispatch(walletConnect(result[0]));
            }

        } catch (err) {
            setError(err.message);
        }

    }
    const updateBalance = async (account) => {
        try {
            const contract = props.etherData.contract;
            let balanceBig = await contract.balanceOf(account);
            let bln = ethers.utils.formatEther(balanceBig)
            return bln;
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    return <div className='main'>
        <div className='container'>
            <h3>Account:{ac}</h3>
            <h3>Balance:{balance}</h3>
            <div className="button">
                <button onClick={handelConnectWallet} >connect</button>
            </div>
        </div>
        <Transfer data={props} />

        <div>
            {/* <h3>{error}</h3> */}
        </div>
    </div>;
}

export default Home;
