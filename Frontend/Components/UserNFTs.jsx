import React, { useState, useEffect } from "react";

const UserNFTs = ({ GET_USER_OWN_NFTS, address }) => {
  const [userNFTs, setUserNFTs] = useState();
  useEffect(() => {
    const load = async () => {
      const nfts = await GET_USER_OWN_NFTS();
      console.log(nfts);

      if (!nfts || nfts.length === 0) return [];

      setUserNFTs(nfts);
    };
    load();
  }, [address]);
  return (
    <div
      id="uni_collection"
      className="uni-collection uk-panel uk-overflow-hidden uk-padding-2xlarge-bottom@m"
      style={{
        marginTop: "7rem",
        marginBottom: "7rem",
      }}
    >
      <div className="uk-container">
        <div className="uk-panel uk-margin-top uk-margin-xlarge-top@m uk-position-z-index">
          <div
            className="uk-grid-xsmall uk-grid@m uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid"
            data-uk-grid="masonry: true;"
          >
            {userNFTs?.map((nft, index) => (
              <div className="uk-padding-medium-top@m">
                <div className="uni-artwork uk-card uk-card-xsmall uk-text-center uk-overflow-hidden uk-radius-medium uk-radius-large@m uk-box-shadow-xsmall dark:uk-background-white-5">
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
                      NFT ID: {nft?.tokenId}
                    </span>
                    <span className="uk-text-meta uk-margin-xsmall-top uk-visible@m">
                      By @theblockchaincoders
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNFTs;
