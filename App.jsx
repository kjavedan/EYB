import "./App.css";
import { Header } from "./layouts";
import Hero from "./sections/Hero";
import Service from "./sections/Service";
import Concerns from "./sections/Concerns";
import Roadmap from "./sections/Roadmap";
import WorkProcess from "./sections/WorkProcess";
import Pricing from "./sections/Pricing";
import DomainSearch from "./sections/DomainSearch";
import About from "./sections/About";
import Testimonials from "./sections/Testimonials";
import FAQs from "./sections/FAQs";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="container mx-auto">
      <Header />

      <main className="px-4 max-w-screen-xl mx-auto">
        <Hero />
        <Service />
        <Concerns />
        {/* <Roadmap /> */}
        <WorkProcess />
        <Pricing />
        <DomainSearch />
        <About />
        <Testimonials />
        <FAQs />
      </main>

      <footer className="px-4">
        <Contact />
      </footer>
    </div>
  );
}

export default App;
