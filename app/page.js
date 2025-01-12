import About from "@/components/About";
import Events from "@/components/events/Events";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Contributaion from "@/components/NewsLetter";
import Stats from "@/components/Statistics/Stats";

export default function Home() {
  return (
    <main className="main-container">
      <div className="w-[90%] mx-auto min-h-screen flex flex-col">
        <Navbar />
        <Header />
      </div>

      <section className="py-6 w-full bg-gray-100">
        <div className="w-[90%] mx-auto">
          <About />
          <Stats />
        </div>
      </section>

      <section className="w-[90%] mx-auto flex flex-col mt-10 space-y-14">
        <Events />
        <Contributaion />
      </section>
      <Footer />
    </main>
  );
}
