import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { walletConnect, getBalance, remove } from '../redux/wallet'
import Transfer from './Transfer';


function Home(props) {

    // redux
    const dispatch = useDispatch();
    const wallet = useSelector(state => state.wallet)

    const [ac, setAc] = useState(wallet.account);
    const [balance, setBalance] = useState(wallet.balance);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // ethers
    const contract = props.contract;

    const etherData = { contract: contract, account: ac, balance: balance, loading: loading, setLoading: setLoading }


    const handelConnectWallet = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (!window.ethereum)
                throw new Error('metamask not found..');
            const result = await window.ethereum.request({ method: 'eth_requestAccounts' })
            if (result) {
                dispatch(walletConnect(result[0]));
                updateBalance(result[0]);
                setAc(result[0])
            }

        } catch (err) {
            setError(err.message);
        }

    }
    // disconnect
    const handelDisconnect = () => {
        if (ac) {
            dispatch(remove())
            window.location.reload()
        }
    }

    // balance
    const updateBalance = async (account) => {
        try {
            let balanceBig = await contract.balanceOf(account);
            const bln = balanceBig.toNumber()
            setBalance(bln)
            dispatch(getBalance(bln));
            return bln
        } catch (error) {
            setError(error)
        }
    }
    const methods = {
        updateBalance: updateBalance
    }


    return <div className='main'>
        <div className='container'>
            <h3>Account:{ac}</h3>
            <h3>Balance:{balance}</h3>
            <div className="button">
                <button onClick={ac ? handelDisconnect : handelConnectWallet} >{ac ? 'conected' : 'connect'}</button>
            </div>
        </div>
        <Transfer etherData={etherData} methods={methods} />

        <div>
            {error ? (
                <p>
                    {error}
                </p>
            ) : (<></>)}
        </div>
    </div>;
}

export default Home;
