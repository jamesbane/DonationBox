import React, {useState, useEffect} from "react";
import style from './Donate.module.scss';
import {Button} from "rebass";
import CurrencyInputPanel from "../../components/CurrencyInput";
import ethLogo from "../../assets/logo/eth.png";
import cn from 'classnames';
import {useWeb3React} from '@web3-react/core';
import {injected, NETWORK_URLS} from "../../connectors";
import {Contract, ethers} from "ethers";
import Web3 from "web3";
import DonateABI from '../../abi/DonateABI';
import useToast from "../../hooks/useToast";
import Loader from "../../components/Loader";

const Donate = () => {
  const [ethValue, updateEthValue] = useState("0");
  const [loading, setLoading] = useState(false);
  const [totalDonated, setTotalDonated] = useState(0);
  const [balance, setBalance] = useState(null);
  const {account, activate, chainId, library} = useWeb3React();
  const {toastSuccess, toastError} = useToast();

  const CONTRACT_ADDRESS = "0x3986FD026EBF1d20ED8B69A07c5AAAaac16B9Ef8";

  const connectWallet = () => {
    toastError("err", "err");
    activate(injected, undefined, true).catch((error) => {
      toastError('Wallet Error', "Failed to connect metamask");
    });
  };

  const onDonate = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(NETWORK_URLS[chainId]);
      const contract = new Contract(CONTRACT_ADDRESS, DonateABI, library.getSigner());
      let nonce = await provider.getTransactionCount(account);
      let gasPrice = await provider.getGasPrice();
      let overrides = {
        gasPrice: 2 * gasPrice, gasLimit: 10 * 21000,
        value: Web3.utils.toWei(ethValue),
        nonce: nonce
      };
      setLoading(true);
      await contract.donate(overrides);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };


  const fetchBalance = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(NETWORK_URLS[chainId]);
      const contract = new Contract(CONTRACT_ADDRESS, DonateABI, library.getSigner());
      const walletBalance = await provider.getBalance(account);

      let total = ethers.utils.formatEther(await contract.getTotalDonations());
      setBalance(Web3.utils.fromWei(walletBalance.toString()));
      setTotalDonated(total);
    } catch (e) {
      toastError('Wallet Error', e);
    }
  };


  useEffect(() => {
    if (account && library) {
      fetchBalance();
    }
  }, [account, chainId, library, toastError]);

  useEffect(() => {
    if (library) {
      const contract = new Contract(CONTRACT_ADDRESS, DonateABI, library.getSigner());
      contract.on("DonationTransferred", async (from, amount, tx) => {

        console.log('DonationTransferred');
        toastSuccess('Donation success', `You donated ${ethers.utils.formatEther(amount)} ETH`);

        updateEthValue("0");
        setLoading(false);
        await fetchBalance();
      });
    }
  }, [library]);

  return (
    <div className={style.container}>
      <div className={style.swapContent}>
        <Loader isVisible={loading}/>
        <div className={style.swapHeader}>
          Donate
          {account && <span>Total Donated: {totalDonated} ETH</span>}
        </div>

        <CurrencyInputPanel
          logo={ethLogo}
          tokenName={"ETH"}
          value={ethValue}
          balance={balance}
          onMax={() => {
            updateEthValue(balance);
          }}
          onUserInput={(value) => {
            if (value === "") {
              updateEthValue("0");
            } else {
              updateEthValue(value);
            }
          }}

          showMaxButton={true}
          id={"eth-input"}
        />


        <div className={style.buttons}>
          {!account ?
            <Button className={cn(style.walletBtn, style.blueBtn)} onClick={connectWallet}>
              Connect Wallet
            </Button>
            :
            <Button className={cn(style.walletBtn, style.blueBtn)} onClick={onDonate}>
              Donate
            </Button>}
        </div>
      </div>
    </div>
  )
};

export default Donate;