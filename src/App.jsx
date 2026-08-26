import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider } from "./context/LangContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GrainOverlay from "./components/layout/GrainOverlay";
import ScrollProgress from "./components/layout/ScrollProgress";
import CustomCursor from "./components/layout/CustomCursor";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <CustomCursor />
        <GrainOverlay />
        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </LangProvider>
    </ThemeProvider>
  );
}
