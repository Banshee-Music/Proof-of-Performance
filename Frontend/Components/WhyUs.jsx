import React from "react";

import WhyUsDetails from "../Components/Data/WhyUs.json";

const WhyUs = () => {
  return (
    <div className="uni-whyus uk-section uk-section-xlarge@m uk-panel">
      <div className="uk-container">
        <header
          className="uk-grid-xsmall uk-flex-center uk-flex-middle uk-grid"
          data-uk-grid=""
        >
          <div className="uk-panel uk-text-center">
            <h2 className="uk-h3 uk-h1@m">Proof-of-Performance</h2>
             <p>Royality model that verifies on-chain transactions of artists' sales, views, and concert attendance.</p>
            <h3>Powered By Subquery</h3>
          </div>
        </header>
      </div>
    </div>
  );
};

export default WhyUs;

