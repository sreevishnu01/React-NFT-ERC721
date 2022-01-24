import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function Transfer(props) {

    const [tokens, setTokens] = useState([]);
    const [tokenId, setTokenId] = useState({ id: null });
    const [reciver, setReciver] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // props
    const contract = props.etherData.contract;
    const account = props.etherData.account;
    const balance = props.etherData.balance;


    const handelChange = (e) => {
        let tkn = e.target.value;
        setTokenId(tokens[tkn])
    }

    const transferNFT = async (e) => {
        e.preventDefault();
        setError(null);
        props.etherData.setLoading(true);
        setLoading(true);
        const tkn = tokenId.id
        try {
            // metamask
            if (!window.ethereum)
                throw new Error('metamask not found..');
            ethers.utils.getAddress(reciver);
            const tx = await contract["safeTransferFrom(address,address,uint256)"](account, reciver, tkn);
            if (tx) {
                setError(tx.hash)
                // change state of balnce and tokens
                const repet = async () => {
                    const curentBln = await valueChange();
                    if (curentBln === balance) {
                        setTimeout(() => {
                            repet();
                        }, 5000)
                    }
                    if (curentBln !== balance) {
                        alert('succsfully transfed');
                    }
                }
                await repet();
            }
        } catch (err) {
            setError(err.message);
            console.log(err)
        }
        finally {
            setLoading(false);
            props.etherData.setLoading(false);
            setTokenId({ id: null });
        }
    }
    const valueChange = () => {
        return props.methods.updateBalance(account, contract);
    }


    useEffect(() => {
        // props
        const contract = props.etherData.contract;
        const account = props.etherData.account;
        const balance = props.etherData.balance;

        const updateOwnTokens = async () => {
            if (account !== null && contract !== null) {
                try {
                    setLoading(true)
                    let index = 0;
                    let result = [];
                    while (index < balance) {
                        const data = await contract.tokenOfOwnerByIndex(account, index);
                        const data1 = await contract.tokenURI(data)
                        let number = data.toNumber()
                        const resultObj = { name: data1, id: number }
                        result.push(resultObj);
                        index++;
                    }
                    setTokens(result);
                    if (result.length !== 0) {
                        props.etherData.setLoading(false);
                        setLoading(false)
                    }
                } catch (err) {
                    setError(err)
                    console.log(err)
                }

            }
        }
        updateOwnTokens();
        props.methods.updateBalance(account);

    }, [props])

    return <div>
        <div className="content">

            <div className='items' >
                {tokens.map((e, key) => (
                    <div key={key}>
                        <input type="radio" value={key} checked={tokenId.id === e.id ? true : false} onChange={handelChange} />
                        <label htmlFor="check">{e.name}</label>
                    </div>

                ))}
            </div>

            <div className='form-container'>
                <label htmlFor="text">Reciver address</label>
                <input type="text" onChange={e => setReciver(e.target.value)} />
                <button onClick={transferNFT}>Transfer NFT</button>
                <div className="error">
                    {error ? (
                        <p>
                            {error}
                        </p>
                    ) : (<></>)}
                </div>
                {props.etherData.loading || loading ? (<>
                    <h2>loading...</h2>
                </>) : (<></>)}
            </div>
        </div>
    </div >;
}

export default Transfer;
