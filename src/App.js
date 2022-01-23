import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ABI } from './Assets/ABI';
import { useDispatch, useSelector } from 'react-redux';
import { getEther } from './redux/wallet';

import Home from "./componets/Home";
// import SimpleWallet from "./componets/SimpleWallet";

function App() {

  // ether
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();

  // const [etherData, setEtherData] = useState({ contract: contract, signer: signer, provider: provider });
  const etherData = { contract: contract, signer: signer, provider: provider }

  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.wallet)

  dispatch(getEther(contract));

  useEffect(() => {
    const updateEther = async () => {
      let tempProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
      let tempSigner = tempProvider.getSigner('0xf80cca0450f5026fe105349b2e8fe4f5fe1b9190');
      const tempContract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, ABI, tempSigner);

      setContract(tempContract);
      setProvider(tempProvider);
      setSigner(tempSigner);
    }
    updateEther();
  }, [])

  return (
    <>
      {/* <SimpleWallet /> */}
      <Home etherData={etherData} reduxData={reduxData} />

    </>
  );
}

export default App;
