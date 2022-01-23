import { useEffect, useState } from 'react';

function useBalance(ac, con, change) {

    const [balance, setBalance] = useState(null);
    const [err, setError] = useState(null);

    useEffect(() => {
        if (ac && change === true) {
            const updateBalance = async (account, contract) => {
                try {
                    let balanceBig = await contract.balanceOf(account);
                    setBalance(balanceBig.toNumber())
                } catch (error) {
                    setError(error)
                    console.log(error)
                }
            }
            updateBalance(ac, con);
        }
    }, [ac, con, change])

    return { balance, err };

}

export default useBalance;
