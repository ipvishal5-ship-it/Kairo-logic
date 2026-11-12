import Header from "@/components/header";
import HomeHero from "@/components/home-hero";
import Footer from "@/components/footer";
import StatementSection from "@/components/statement-section";
import ShowcaseStages from "@/components/showcase-stages";
import MorphStory from "@/components/morph-story";
import ApproachSection from "@/components/approach-section";
import ClosingBand from "@/components/closing-band";

export default function Home() {
  return (
    <>
      <Header />
      <HomeHero />
      <main id="main" className="c-main">
        <StatementSection />
        <ShowcaseStages />
        <MorphStory />
        <ApproachSection />
        <ClosingBand />
      </main>
      <Footer />
    </>
  );
}
