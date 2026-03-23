import React from "react";

const Faq = () => {
  return (
    <div
      id="uni_faq"
      className="uni-faq uk-section uk-section-large@m uk-panel uk-overflow-hidden uk-padding-2xlarge-bottom@m"
    >
      <div className="uk-container">
        <header
          className="uk-grid-xsmall uk-flex-center uk-flex-middle uk-text-center uk-child-width-auto@m uk-grid"
          data-uk-grid=""
        >
          <div className="uk-panel">
            <h2 className="uk-h3 uk-h1@m">FAQ</h2>
          </div>
        </header>
        <div className="uk-panel uk-margin-medium-top uk-margin-2xlarge-top@m">
          <ul
            className="uk-card uk-card-small uk-card-large@m uk-radius uk-radius-large@m uk-width-2xlarge@m uk-margin-auto uk-box-shadow-xsmall dark:uk-background-white-5"
            data-uk-accordion="collapsible: false"
          >
            <li>
              <a className="uk-accordion-title uk-h5@m" href="#">
                What is Banshee Music?
              </a>
              <div className="uk-accordion-content uk-padding-small-bottom">
                <p className="uk-text-small uk-text-large@m uk-text-muted">
                  Banshee is a music airdrop platform. Artists can airdrop song, albums, and tickets to performances to fans.
                </p>
                <p className="uk-text-small uk-text-large@m uk-text-muted">
                  Banshee allows for subscriptions as well.
                </p>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title uk-h5@m" href="#">
                Who are Banshees?
              </a>
              <div className="uk-accordion-content uk-padding-small-bottom">
                <p className="uk-text-small uk-text-large@m uk-text-muted">
                  Banshees are artists who have entered the platform's royality system. Banshees mine the Banshee token by using the platform and allowing our Proof-of-Peformance system to verify their ticket sales.
                </p>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title uk-h5@m" href="#">
                What type of tickets can I sell?
              </a>
              <div className="uk-accordion-content uk-padding-small-bottom">
                <p className="uk-text-small uk-text-large@m uk-text-muted">
                  You can sell tickets to live performances both in-person and livestreams. Artists can also sell tickets to subscription and rewards programs.
                </p>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title uk-h5@m" href="#">
                Where can I sell my tickets?
              </a>
              <div className="uk-accordion-content uk-padding-small-bottom">
                <p className="uk-text-small uk-text-large@m uk-text-muted">
                  Tickets can be resold on Banshee and other Web3 marketplaces.
                </p>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title uk-h5@m" href="#">
                How secure is this?
              </a>
              <div className="uk-accordion-content uk-padding-small-bottom">
                <p className="uk-text-small uk-text-large@m uk-text-muted">
                  Banshee is very secure for both artists and fans. Protecting artists' IP Rights is a high priority for Banshee.
                </p>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title uk-h5@m" href="#">
                Do I need a crypto wallet?
              </a>
              <div className="uk-accordion-content uk-padding-small-bottom">
                <p className="uk-text-small uk-text-large@m uk-text-muted">
                  NO! Fans can purchase tickets using any form payment, for example credit/debit cards.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Faq;
