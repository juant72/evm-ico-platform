import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import TokenInfo from "../components/home/TokenInfo";
import Timeline from "../components/home/Timeline";
import Team from "../components/home/Team";
import Roadmap from "../components/home/Roadmap";
import FAQ from "../components/home/FAQ";

/**
 * Home page component - Landing page for the ICO platform
 */
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Encrypia - Advanced ICO Platform</title>
        <meta
          name="description"
          content="Participate in our ICO and be part of the next generation blockchain ecosystem"
        />
        <meta
          name="keywords"
          content="ico, token sale, blockchain, crypto, investment"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
        <Header />

        <main className="pb-20">
          <Hero />
          <TokenInfo />
          <Timeline />
          <Roadmap />
          <Team />
          <FAQ />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
