import Footer from "@src/Footer/Footer";
import LandingHeader from "@src/marketingSite/LandingHeader";
import PermissionedExchangeSection from "@src/marketingSite/PermissionedExchangeSection";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Real Asset Syndicator",
  description: "Give investors in your offerings a Robinhood-like experience.",
  openGraph: {
    title: "Permissioned Exchange",
    type: "website",
    description: "Give investors in your offerings a Robinhood-like experience.",
    url: "https://syndicate.cooperativ.io/",
    images: ["/assets/images/share.png"]
  },
  twitter: {
    title: "Permissioned Exchange",
    description: "Give investors in your offerings a Robinhood-like experience.",
    card: "summary_large_image",
    images: ["/assets/images/share.png"]
  }
};

const Application = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <LandingHeader />
      <PermissionedExchangeSection />
      <Footer />
    </div>
  );
};

export default Application;
