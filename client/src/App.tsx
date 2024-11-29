import { useState } from "react";
import { Moon, Sun, Github } from "lucide-react";
import Home from "./pages/Home";
import { Button } from "./components/ui/button";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 
                      dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/75 dark:bg-gray-900/75 
                       border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Brand */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 
                              flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                               dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  TaskMaster
                </span>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center space-x-4">
                {/* GitHub Link */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 
                           dark:hover:text-gray-100 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-600" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Home />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built with React & Tailwind CSS
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 
                           dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 
                           dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 
                           dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;