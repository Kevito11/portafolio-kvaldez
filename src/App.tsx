import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';



function App() {
  return (
    <LanguageProvider>
      <div className="bg-navy-900 min-h-screen">
        <Navbar />
        <main className="flex flex-col">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
