import React from "react";

const Hero = () => {
  return (
    <div className="uni-hero uk-section-2xlarge uk-padding-2xlarge-bottom uk-panel uk-overflow-hidden dark:uk-background-gray-100 swiper-parent">
      <div className="uk-position-top">
        <div
          className="uk-position-cover uk-background-cover uk-opacity-20"
          data-src="../assets/images/hero-image.jpg"
          data-uk-img=""
        />
        <div
          className="uk-position-cover uk-background-cover dark:uk-hidden"
          style={{
            background: "linear-gradient(to top, white 25%, transparent 75%)",
          }}
        />
        <div
          className="uk-position-cover uk-background-cover uk-hidden dark:uk-visible"
          style={{
            background:
              "linear-gradient(to top, var(--color-gray-100) 25%, transparent 75%)",
          }}
        />
      </div>
      <div className="uk-container">
        <div className="uk-panel">
          <div className="uk-grid uk-grid-2xlarge@m uk-child-width-1-1@m">
            <div>
              <div className="uk-panel uk-text-center uk-margin-top">
                <h1 className="uk-h2 uk-h1@s uk-heading-d1@m uk-text-uppercase">
                  Ticket Marketplace <br className="uk-visible@m" />
                  <span className="uk-text-gradient">Claim Airdrops</span>
                </h1>
              </div>
            </div>
            <div>
              <div className="uk-panel uk-overflow-hidden">
                <div className="uk-grid-xsmall uk-grid@m uk-flex-middle uk-flex-center uk-grid">
                  <div className="uk-width-3-12 uk-width-4-12@m">
                    <div className="uk-grid-xsmall uk-grid@m uk-child-width-1-2@m uk-flex-middle uk-grid">
                      <div className="uk-visible@m">
                        <div>
                          <div className="uk-card uk-card-2xsmall uk-card-default uk-radius-xlarge dark:uk-background-white-10">
                            <div className="uk-panel uk-overflow-hidden uk-radius-large">
                              <canvas width={600} height={800} />
                              <img
                                src="../assets/images/collections/stock13.jpg"
                                alt="Artwork"
                                className="uk-cover"
                                data-uk-cover=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="uk-panel uk-grid-xsmall uk-grid@m uk-grid">
                          <div>
                            <div className="uk-card uk-card-2xsmall uk-card-default uk-radius-xlarge dark:uk-background-white-10">
                              <div className="uk-panel uk-overflow-hidden uk-radius-large">
                                <canvas
                                  className="uk-visible@m"
                                  width={200}
                                  height={170}
                                />
                                <canvas
                                  className="uk-hidden@m"
                                  width={300}
                                  height={298}
                                />
                                <img
                                  src="../assets/images/collections/02.jpg"
                                  alt="Artwork"
                                  className="uk-cover"
                                  data-uk-cover=""
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="uk-card uk-card-2xsmall uk-card-default uk-radius-xlarge dark:uk-background-white-10">
                              <div className="uk-panel uk-overflow-hidden uk-radius-large">
                                <canvas width={300} height={298} />
                                <img
                                  src="../assets/images/collections/03.png"
                                  alt="Artwork"
                                  className="uk-cover"
                                  data-uk-cover=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="uk-width-expand">
                    <div className="uk-card uk-card-2xsmall uk-card-default uk-radius-xlarge dark:uk-background-white-10">
                      <div className="uk-panel uk-overflow-hidden uk-radius-large">
                        <canvas width={400} height={600} />
                        <img
                          src="../assets/images/collections/01.jpg"
                          alt="Artwork"
                          className="uk-cover"
                          data-uk-cover=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="uk-width-3-12 uk-width-4-12@m">
                    <div className="uk-grid-xsmall uk-grid@m uk-child-width-1-2@m uk-flex-middle uk-grid">
                      <div>
                        <div className="uk-panel uk-grid-xsmall uk-grid@m uk-grid">
                          <div>
                            <div className="uk-card uk-card-2xsmall uk-card-default uk-radius-xlarge dark:uk-background-white-10">
                              <div className="uk-panel uk-overflow-hidden uk-radius-large">
                                <canvas width={300} height={298} />
                                <img
                                  src="../assets/images/collections/stock7.jpg"
                                  alt="Artwork"
                                  className="uk-cover"
                                  data-uk-cover=""
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="uk-card uk-card-2xsmall uk-card-default uk-radius-xlarge dark:uk-background-white-10">
                              <div className="uk-panel uk-overflow-hidden uk-radius-large">
                                <canvas
                                  className="uk-visible@m"
                                  width={200}
                                  height={170}
                                />
                                <canvas
                                  className="uk-hidden@m"
                                  width={300}
                                  height={298}
                                />
                                <img
                                  src="../assets/images/collections/stock8.jpg"
                                  alt="Artwork"
                                  className="uk-cover"
                                  data-uk-cover=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="uk-visible@m">
                        <div>
                          <div className="uk-card uk-card-2xsmall uk-card-default uk-radius-xlarge dark:uk-background-white-10">
                            <div className="uk-panel uk-overflow-hidden uk-radius-large">
                              <canvas width={600} height={800} />
                              <img
                                src="../assets/images/collections/Pete.JPG"
                                alt="Artwork"
                                className="uk-cover"
                                data-uk-cover=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
