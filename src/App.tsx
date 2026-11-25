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
import AdminStyleGate from './components/AdminStyleGate';
import SplitScreenLayout from './layouts/SplitScreenLayout';
import ExecutiveTabsLayout from './layouts/ExecutiveTabsLayout';
import BentoDockLayout from './layouts/BentoDockLayout';
import IdeWorkspaceLayout from './layouts/IdeWorkspaceLayout';
import MasterDetailLayout from './layouts/MasterDetailLayout';
import CommandLinearLayout from './layouts/CommandLinearLayout';
import ReadCvLayout from './layouts/ReadCvLayout';
import ModularSidebarLayout from './layouts/ModularSidebarLayout';
import StoryCardsLayout from './layouts/StoryCardsLayout';
import TechStudioLayout from './layouts/TechStudioLayout';

const PortfolioContent = () => {
  const { brand } = useTheme();

  const renderLayout = () => {
    switch (brand) {
      case 'terminal':
        return <SplitScreenLayout />;
      case 'executive':
        return <ExecutiveTabsLayout />;
      case 'ocean':
        return <BentoDockLayout />;
      case 'ide':
        return <IdeWorkspaceLayout />;
      case 'showcase':
        return <MasterDetailLayout />;
      case 'linear':
        return <CommandLinearLayout />;
      case 'readcv':
        return <ReadCvLayout />;
      case 'sidebar':
        return <ModularSidebarLayout />;
      case 'story':
        return <StoryCardsLayout />;
      case 'studio':
        return <TechStudioLayout />;
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
      <AdminStyleGate />
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
