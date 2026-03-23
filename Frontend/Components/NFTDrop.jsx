import React from "react";

import { useStateContext } from "../Context/index";
const NFTDrop = ({ claimNFT, setClaimNFT }) => {
  const { CREATE_NFT, loader } = useStateContext();
  return (
    <div className="new-loader-wrapper">
      <div className="modal">
        <div className="modal-body">
          <div className="uni-artwork-featured-image uk-panel uk-flex-middle uk-flex-center">
            <div className="uk-padding-medium-top@m">
              <div className="uni-artwork uk-card uk-card-xsmall uk-text-center uk-overflow-hidden uk-radius-medium uk-radius-large@m uk-box-shadow-xsmall dark:uk-background-white-5">
                <div className="uni-artwork-featured-image uk-panel uk-flex-middle uk-flex-center">
                  <div className="uk-panel uk-image-middle">
                    <img
                      src={claimNFT?.image}
                      alt={claimNFT?.name}
                      className="uk-radius-small uk-radius-medium@m"
                    />
                    <a className="uk-position-cover" />
                  </div>
                </div>
                <div className="uni-artwork-content uk-panel uk-margin-small-top uk-margin-2xsmall-bottom uk-flex-column uk-flex-middle">
                  <h2 className="uk-h6 uk-h5@m uk-margin-remove">
                    <a className="uk-link-reset" href="#">
                      {claimNFT?.name}
                    </a>
                  </h2>
                  <span className="uk-text-meta uk-margin-xsmall-top uk-visible@m">
                    By Banshee
                  </span>
                  <span className="uk-text-meta uk-margin-xsmall-top uk-visible@m">
                    Pay: 0.00025 ETH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={() => setClaimNFT("")}>
            Cancel
          </button>

          {loader ? (
            <svg className="new_svg" viewBox="25 25 50 50">
              <circle className="new_circle" r="20" cy="50" cx="50"></circle>
            </svg>
          ) : (
            <button
              className="btn-primary"
              onClick={() => CREATE_NFT(claimNFT)}
            >
              Claim Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTDrop;
