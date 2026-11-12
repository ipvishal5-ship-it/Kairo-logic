import Header from "@/components/header";
import Footer from "@/components/footer";
import NeedSolutionPart1 from "@/components/need-solution-part1";
import NeedSolutionPart2 from "@/components/need-solution-part2";
import "./ns.css";

export const metadata = {
  title: { absolute: "Need a solution | Kairologic" },
  description:
    "Every organisation we work with started with the same sentence: “there must be a better way to do this.” Scattered records, manual chasing, missed deadlines, no live view.",
};

export default function NeedSolutionPage() {
  return (
    <>
      <Header activeNav="need-a-solution" />
      <main id="main" className="ns-page">
        <NeedSolutionPart1 />
        <NeedSolutionPart2 />
      </main>
      <Footer />
    </>
  );
}
