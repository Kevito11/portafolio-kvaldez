import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BrandSwitcher from './components/BrandSwitcher';
import SplitScreenLayout from './layouts/SplitScreenLayout';
import ExecutiveTabsLayout from './layouts/ExecutiveTabsLayout';
import SwissEditorialLayout from './layouts/SwissEditorialLayout';
import BentoDockLayout from './layouts/BentoDockLayout';
import GalleryMinimalLayout from './layouts/GalleryMinimalLayout';

const PortfolioContent = () => {
  const { brand } = useTheme();

  const renderLayout = () => {
    switch (brand) {
      case 'terminal':
        return <SplitScreenLayout />;
      case 'executive':
        return <ExecutiveTabsLayout />;
      case 'swiss':
        return <SwissEditorialLayout />;
      case 'ocean':
        return <BentoDockLayout />;
      case 'monochrome':
        return <GalleryMinimalLayout />;
      case 'architect':
      default:
        return (
          <div className="bg-bg-primary text-text-primary min-h-screen transition-colors duration-300">
            <Navbar />
            <main className="flex flex-col">
              <Hero />
              <About />
              <Experience />
              <Education />
              <Skills />
              <Projects />
              <Contact />
            </main>
          </div>
        );
    }
  };

  return (
    <>
      {renderLayout()}
      <BrandSwitcher />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
