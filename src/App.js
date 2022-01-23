import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { ABI } from './Assets/ABI';
import Home from "./componets/Home";

function App() {
  // ether
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // contract
    const updateEther = async () => {
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      let tempSigner = tempProvider.getSigner();
      const tempContract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, ABI, tempSigner);

      setContract(tempContract);
      return tempContract;
    }
    updateEther();

  }, [])

  return (
    <>
      <Home contract={contract} />

    </>
  );
}

export default App;
