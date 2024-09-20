import React, { useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

function AddNetworkButtons() {
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    function waitForButton() {
      const mainnetButton = document.getElementById(
        "add-network-button-mainnet"
      );
      const testnetButton = document.getElementById(
        "add-network-button-testnet"
      );

      if (mainnetButton && testnetButton) {
        mainnetButton.addEventListener("click", async () => {
          if (typeof window.ethereum === "undefined") {
            alert(
              "MetaMask is not installed. Please install MetaMask to use this feature."
            );
            return;
          }

          await addNetwork({
            chainId: "0x1E",
            chainName: "Rootstock Mainnet",
            rpcUrls: ["https://public-node.rsk.co"],
            blockExplorerUrls: ["https://explorer.rootstock.io/"],
            nativeCurrency: {
              name: "Rootstock",
              symbol: "RBTC",
              decimals: 18,
            },
          });
        });

        testnetButton.addEventListener("click", async () => {
          if (typeof window.ethereum === "undefined") {
            alert(
              "MetaMask is not installed. Please install MetaMask to use this feature."
            );
            return;
          }

          await addNetwork({
            chainId: "0x1F",
            chainName: "Rootstock Testnet",
            rpcUrls: ["https://public-node.testnet.rsk.co"],
            blockExplorerUrls: ["https://explorer.testnet.rootstock.io/"],
            nativeCurrency: {
              name: "Testnet Rootstock",
              symbol: "tRBTC",
              decimals: 18,
            },
          });
        });
      } else if (retryCount < maxRetries) {
        console.log("Buttons not found yet, retrying...");
        retryCount++;
        setTimeout(waitForButton, 500);
      } else {
        console.error("Buttons not found after maximum retries.");
      }
    }

    waitForButton();
  }, []);

  async function addNetwork(networkParams) {
    try {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (currentChainId === networkParams.chainId.toLowerCase()) {
        return;
      }

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networkParams],
      });
    } catch (error) {
      console.error(`Error adding ${networkParams.chainName} network:`, error);
      alert(`Failed to add ${networkParams.chainName}: ${error.message}`);
    }
  }

  return null;
}

export default function WrappedAddNetworkButtons() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <AddNetworkButtons />}
    </BrowserOnly>
  );
}
