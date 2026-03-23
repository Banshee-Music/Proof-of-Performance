import React, {
  useMemo,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BigNumber, ethers } from "ethers";
import { config } from "../Context/wagmiConfigs";

import { useAccount, useBalance, useChains } from "wagmi";

import {
  NFTS_AIRDROP_ABI,
  NFTS_AIRDROP_ADDRESS,
  parseErrorMsg,
} from "./constants";
import { useEthersProvider, useEthersSigner } from "../provider/hooks";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const chains = useChains();

  const [loader, setLoader] = useState(false);

  const { address, isConnected } = useAccount({
    config: config,
  });

  const CREATE_NFT = async (nft) => {
    try {
      const { IPFS_URL, name } = nft;
      setLoader(true);

      const contract = new ethers.Contract(
        NFTS_AIRDROP_ADDRESS,
        NFTS_AIRDROP_ABI,
        signer
      );
      const listingPrice = await contract.mintFee();
      const transaction = await contract.mint(IPFS_URL, name, {
        value: listingPrice.toString(),
      });

      const receipt = await transaction.wait();

      const message = "NFT Mint Successfully";

      setLoader(false);
      notifySuccess("Successfully created");
      window.location.reload();
    } catch (error) {
      setLoader(false);
      const errorMessage = parseErrorMsg(error);
      notifyError(errorMessage);
    }
  };

  const GET_USER_OWN_NFTS = async () => {
    try {
      const contract = new ethers.Contract(
        NFTS_AIRDROP_ADDRESS,
        NFTS_AIRDROP_ABI,
        signer
      );

      const ownNFTs = await contract.fetchUserOwnedNFTs(address);

      const nfts = await Promise.all(
        ownNFTs.map(async ({ tokenId, creator, tokenURI }) => {
          const {
            data: { name, description, category, image, size, type },
          } = await axios.get(tokenURI, {});

          return {
            name,
            description,
            category,
            image,
            tokenId: tokenId.toNumber(),
            creator,
            tokenURI,
          };
        })
      );

      return nfts;
    } catch (error) {
      console.log(error);
    }
  };

  const GET_USER_CREATED_NFTS = async () => {
    try {
      const contract = new ethers.Contract(
        NFTS_AIRDROP_ADDRESS,
        NFTS_AIRDROP_ABI,
        signer
      );

      const ownNFTs = await contract.fetchUserCreatedNFTs(address);

      const nfts = await Promise.all(
        ownNFTs.map(async ({ tokenId, creator, tokenURI }) => {
          const {
            data: { name, description, category, image, type },
          } = await axios.get(tokenURI, {});

          return {
            name,
            description,
            category,
            image,
            tokenId: tokenId.toNumber(),
            creator,
            tokenURI,
          };
        })
      );

      return nfts;
    } catch (error) {
      console.log(error);
    }
  };

  const ALL_NOTIFICATIONS = async () => {
    try {
      const contract = new ethers.Contract(
        NFTS_AIRDROP_ADDRESS,
        NFTS_AIRDROP_ABI,
        signer
      );

      const notifications = await contract.GET_NOTIFICATIONS();

      const nfts = await Promise.all(
        notifications.map(
          async ({ id, userAddress, message, timestamp, nftID }) => {
            return {
              id: id.toNumber(),
              userAddress,
              message,
              timestamp: timestamp.toNumber(),
              nftID: nftID.toNumber(),
            };
          }
        )
      );

      return nfts;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        CREATE_NFT,
        GET_USER_OWN_NFTS,
        GET_USER_CREATED_NFTS,
        ALL_NOTIFICATIONS,
        loader,
        address,
        setLoader,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
