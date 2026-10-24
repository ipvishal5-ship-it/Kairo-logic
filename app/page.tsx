import Header from "@/components/header";
import Hero from "@/components/hero";
import Problem from "@/components/problem";
import Record from "@/components/record";
import Dashboard from "@/components/dashboard";
import Trust from "@/components/trust";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Record />
        <Dashboard />
        <Trust />
        <Contact />
      </main>
    </>
  );
}
