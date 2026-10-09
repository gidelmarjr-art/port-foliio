import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider } from "./context/LangContext";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import GrainOverlay from "./components/layout/GrainOverlay/GrainOverlay";
import ScrollProgress from "./components/layout/ScrollProgress/ScrollProgress";
import CustomCursor from "./components/layout/CustomCursor/CustomCursor";
import Hero from "./components/sections/Hero/Hero";
import About from "./components/sections/About/About";
import Skills from "./components/sections/Skills/Skills";
import Projects from "./components/sections/Projects/Projects";
import Contact from "./components/sections/Contact/Contact";

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
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
