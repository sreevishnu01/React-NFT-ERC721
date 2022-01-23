import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

function Transfer(props) {

    const [tokens, setTokens] = useState([]);
    const [tokenId, setTokenId] = useState();
    const [reciver, setReciver] = useState();

    const [error, setError] = useState(null);



    const handelChange = (e) => {
        setTokenId(e.target.value)
    }

    const transferNFT = async () => {
        setError(null)
        const contract = props.data.etherData.contract;
        const account = props.data.reduxData.account;
        try {
            if (!window.ethereum)
                throw new Error('metamask not found..');
            ethers.utils.getAddress(reciver);
            // const tx = await contract.safeTransferFrom({
            //     address: account,
            //     address: reciver,
            //     uint256: tokenId
            // });
            const tx = contract["safeTransferFrom(address,address,uint256)"](account, reciver, tokenId);
            console.log(tx)
        } catch (err) {
            setError(err.message);
        }
    }
    // console.log(tokenId)


    useEffect(() => {
        const contract = props.data.etherData.contract;
        const account = props.data.reduxData.account;
        const updateOwnTokens = async () => {
            // await ERC721.methods.userOwnedTokens.call(walletAddress)
            // let result = await contract.userOwnedTokens.call(account);
            try {
                if (account) {
                    let index = 0
                    let result = [];
                    while (index < 20) {
                        const data = await contract.tokenOfOwnerByIndex(account, index);
                        const data1 = await contract.tokenURI(data)
                        let number = data.toNumber()
                        const resultObj = { name: data1, tokenId: number }
                        result.push(resultObj);
                        index++;
                    }
                    setTokens(result);
                }
            } catch (err) {
                // setError(err)
            }

        }
        updateOwnTokens();

    }, [props])

    return <div>
        <div className="content">
            <div className='items' >
                {tokens.map((e, key) => (
                    <div key={key}>
                        <input type="radio" value={e.tokenId} checked={tokenId == e.tokenId ? true : false} onChange={handelChange} />
                        <label htmlFor="check">{e.name}</label>
                    </div>

                ))}
            </div>
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
            </div>
        </div>
    </div>;
}

export default Transfer;
