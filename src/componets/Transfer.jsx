import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function Transfer(props) {

    const [tokens, setTokens] = useState([]);
    const [tokenId, setTokenId] = useState({ id: null });
    const [reciver, setReciver] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handelChange = (e) => {

        let tkn = e.target.value;
        setTokenId(tokens[tkn])
        console.log(tokens[tkn])
    }

    const transferNFT = async () => {

        setError(null)
        const contract = props.etherData.contract;
        const account = props.etherData.account;
        const tkn = tokenId.id
        try {
            if (!window.ethereum)
                throw new Error('metamask not found..');
            ethers.utils.getAddress(reciver);
            const tx = await contract["safeTransferFrom(address,address,uint256)"](account, reciver, tkn);
            if (tx) {
                setError(tx.hash)
                test();
            }
        } catch (err) {
            setError(err.message);
            console.log(err)
        }
    }
    const test = () => {
        const contract = props.etherData.contract;
        const account = props.etherData.account;
        props.methods.updateBalance(account, contract);
    }


    useEffect(() => {
        const contract = props.etherData.contract;
        const account = props.etherData.account;
        const balance = props.etherData.balance;
        const updateOwnTokens = async () => {
            // await ERC721.methods.userOwnedTokens.call(walletAddress)
            // let result = await contract.userOwnedTokens.call(account);
            try {
                if (account && contract) {
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
                }
            } catch (err) {
                setError(err)
                console.log(err)
            }
            finally {

            }

        }
        updateOwnTokens();

    }, [props])

    return <div>
        <div className="content">
            {props.etherData.loading || loading ? (<>
                <h2>loading...</h2>
            </>) : (
                <div className='items' >
                    {tokens.map((e, key) => (
                        <div key={key}>
                            <input type="radio" value={key} checked={tokenId.id === e.id ? true : false} onChange={handelChange} />
                            <label htmlFor="check">{e.name}</label>
                        </div>

                    ))}
                </div>
            )}

            <div className='form-container'>
                <input type="text" onChange={e => setReciver(e.target.value)} />
                <button onClick={transferNFT}>Transfer NFT</button>
                <div className="error">
                    {error ? (
                        <p>
                            {error}
                        </p>
                    ) : (<></>)}
                </div>
                <button onClick={test}>balnce update</button>
            </div>
        </div>
    </div >;
}

export default Transfer;
