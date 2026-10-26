import Header from "@/components/header";
import Showcase from "@/components/showcase";
import Contact from "@/components/contact";
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Showcase />
        <Contact />
      </main>
    </>
  );
}
