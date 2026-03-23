import React, { useState, useEffect } from "react";
import { useStateContext } from "../Context/index";

//INTERNAL IMPORT
import {
  Theme,
  ConnectWallet,
  Header,
  Hero,
  Collection,
  Image,
  WhyUs,
  About,
  Team,
  Numbers,
  Roadmap,
  Faq,
  Cta,
  Footer,
} from "../Components/index";
import Admin from "../Components/Admin";
import Loader from "../Components/Loader";
import NFTDrop from "../Components/NFTDrop";
import UserNFTs from "../Components/UserNFTs";
import Booking from "../Components/Booking";
import MobileNav from "../Components/MobileNav";

const index = () => {
  const { loader, GET_USER_OWN_NFTS, address } = useStateContext();
  const [admin, setAdmin] = useState(false);
  const [claimNFT, setClaimNFT] = useState();

  const [openUserNFTs, setOpenUserNFTs] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [booking, setBooking] = useState();

  return (
    <div className="uni-body">
      <Theme setOpenNav={setOpenNav} openNav={openNav} />
      <div className="wrap uk-overflow-hidden">
        <Header setOpenUserNFTs={setOpenUserNFTs} />
        {openUserNFTs ? (
          <UserNFTs GET_USER_OWN_NFTS={GET_USER_OWN_NFTS} address={address} />
        ) : (
          <>
            <Hero />
            <Collection setClaimNFT={setClaimNFT} />
            <Image />
            <WhyUs />
            <Image />
            <About />
            <Image />
            <Team />
            <Image />
            <Numbers />
            <Image />
            <Roadmap />
            <Image />
            <Faq />
            <Cta />
          </>
        )}
      </div>
      <Footer />
      {admin && <Admin setAdmin={setAdmin} />}
      {loader && <Loader />}
      {claimNFT && <NFTDrop claimNFT={claimNFT} setClaimNFT={setClaimNFT} />}
      {booking && <Booking setBooking={setBooking} />}
      {openNav && (
        <MobileNav
          setOpenNav={setOpenNav}
          openNav={openNav}
          address={address}
          setAdmin={setAdmin}
          setOpenUserNFTs={setOpenUserNFTs}
          setBooking={setBooking}
        />
      )}
    </div>
  );
};

export default index;
