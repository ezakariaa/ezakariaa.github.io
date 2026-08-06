import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projets from "@/components/Projets";
import Experience from "@/components/Experience";
import Competences from "@/components/Competences";
import APropos from "@/components/APropos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projets />
        <Experience />
        <Competences />
        <APropos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
