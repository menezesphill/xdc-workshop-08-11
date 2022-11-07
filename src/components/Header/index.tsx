import React from "react";
import styles from "./styles.module.scss";
import { Web3ModalContext } from "../../Context/Web3ModalProvider";

const Header: React.FC = () => {

  function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }

  const { account, connect, disconnect } = React.useContext(Web3ModalContext);

  const handleConnect = React.useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnect = React.useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <nav className={styles.header}>
      <div className={styles.sides}>
        <div className={styles.left}>
        </div>
        <div className={styles.right}>
          { ! account ? (
            <div className={styles.connectButton} onClick={handleConnect}><span>NOT CONNECTED</span></div>
          ) : (
            <div className={styles.connectButton} onClick={handleDisconnect}>{ellipseAddress(account)}</div>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
