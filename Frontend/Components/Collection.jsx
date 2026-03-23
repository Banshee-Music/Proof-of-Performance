import React, { useState, useEffect } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

import events from "../Components/Data/Events.json";
const BLOCK_EXPLORER = process.env.NEXT_PUBLIC_BLOCK_EXPLORER;
const NFTS_AIRDROP = process.env.NEXT_PUBLIC_NFTS_AIRDROP;

const Collection = ({ setClaimNFT }) => {
  const [airdrops, setAirdrops] = useState();
  useEffect(() => {
    const load = async () => {
      const airdropsLists = JSON.parse(localStorage.getItem("NFTS_AIRDROPS"));

      console.log(airdropsLists);

      if (!airdropsLists || airdropsLists.length === 0) return [];

      setAirdrops(airdropsLists);
    };
    load();
  }, []);
  return (
    <div
      id="uni_collection"
      className="uni-collection uk-panel uk-overflow-hidden uk-padding-2xlarge-bottom@m"
    >
      <div className="uk-container">
        <div className="uk-panel uk-margin-top uk-margin-xlarge-top@m uk-position-z-index">
          <div
            className="uk-grid-xsmall uk-grid@m uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid"
            data-uk-grid="masonry: true;"
          >
            {events?.map((nft, index) => (
              <div className="uk-padding-medium-top@m">
                <div
                  onClick={() => setClaimNFT(nft)}
                  className="uni-artwork uk-card uk-card-xsmall uk-text-center uk-overflow-hidden uk-radius-medium uk-radius-large@m uk-box-shadow-xsmall dark:uk-background-white-5"
                >
                  <div className="uni-artwork-featured-image uk-panel uk-flex-middle uk-flex-center">
                    <div className="uk-panel uk-image-middle">
                      <img
                        src={nft?.image}
                        alt={nft?.name}
                        className="uk-radius-small uk-radius-medium@m"
                      />
                      <a className="uk-position-cover" />
                    </div>
                  </div>
                  <div className="uni-artwork-content uk-panel uk-margin-small-top uk-margin-2xsmall-bottom uk-flex-column uk-flex-middle">
                    <h2 className="uk-h6 uk-h5@m uk-margin-remove">
                      <a className="uk-link-reset" href="#">
                        {nft?.name}
                      </a>
                    </h2>
                    <span className="uk-text-meta uk-margin-xsmall-top uk-visible@m">
                      Banshee Music Labs
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="uni-btn uk-margin-medium-top uk-margin-2xlarge-top@m uk-flex-center">
            <a
              href="https://testnet.bsctrace.com/tx/0x6f1ce4916e48714d92f18a59946a1b8c2da3c8e1a3cab001052f8159f4fa8fba"
              target="_blank"
              className="uk-button uk-button-small uk-button-large@m uk-button-gradient"
            >
              <span>View Contract</span>
              <i className="">
                <FaArrowTrendUp />
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
