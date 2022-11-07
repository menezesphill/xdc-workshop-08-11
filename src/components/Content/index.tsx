import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Web3ModalContext } from "../../Context/Web3ModalProvider";

const Content: React.FC = () => {
  const [xdcAddress, setXdcAddress] = useState("");
  const [xdcBalance, setXdcBalance] = useState("");
  const [currentChainId, setCurrentChainId] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);

  const { account, chainId, web3 } = React.useContext(Web3ModalContext);

  const getAddress = () => {
    if(account) {
      setXdcAddress(`xdc${account.slice(2)}`);
    } else {
      setXdcAddress("");
    }
  }

  const getChainId = () => {
    if(chainId) {
      setCurrentChainId(String(chainId));
    } else {
      setCurrentChainId("");
    }
  }
  
  const getBalance = async () => {
    if(web3 && account) {
      const balance = await web3.eth.getBalance(account);
      setXdcBalance(web3.utils.fromWei(balance, "ether"));
    } else {
      setXdcBalance("");
    }
  }

  const getWalletStatus = () => {
    if(account && chainId) {
      setWalletStatus(true);
    } else {
      setWalletStatus(false);
    }
  }

  React.useEffect(() => {
    getAddress();
    getChainId();
    getBalance();
    getWalletStatus();
  }, [account, chainId, web3]);
  
  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.interface}>
          <div className={styles.columns} style={{ height: "300px" }}>
              <div className={styles.form}>
                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Address:</label>
                  </div>
                  <input
                    type="text"
                    value={xdcAddress}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>Connected to:</label>
                  </div>
                  <input
                    type="text"
                    value={currentChainId}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.title}>
                    <label>My XDC Balance:</label>
                  </div>
                  <input
                    type="text"
                    value={xdcBalance}
                  />
                </div>

                <div className={styles.walletStatus}>
                      <div
                        className={styles.ball}
                        style={
                          walletStatus
                            ? { backgroundColor: "lime" }
                            : { backgroundColor: "red" }
                        }
                      />
                      Wallet {walletStatus ? "Connected" : "Disconnected"}
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </section>
  );
};

export default Content;
