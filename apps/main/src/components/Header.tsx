import { useCallback, useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

const Header: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>("system");

  // Apply theme to HTML element
  const applyTheme = useCallback((theme: Theme) => {
    const html = document.documentElement;

    if (theme === "system") {
      html.removeAttribute("data-theme");
    } else if (theme === "light") {
      html.setAttribute("data-theme", "bumblebee");
    } else if (theme === "dark") {
      html.setAttribute("data-theme", "bumblebee-dark");
    }
  }, []);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const theme = savedTheme || "system";
    setCurrentTheme(theme);
    applyTheme(theme);
  }, [applyTheme]);

  // Handle theme change
  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  };

  // Cycle to next theme
  const cycleTheme = () => {
    const themeOrder: Theme[] = ["system", "light", "dark"];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    handleThemeChange(themeOrder[nextIndex]);
  };

  return (
    <div className=" bg-base-100 sticky top-0 z-50 shadow-md">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="Logo" className="w-6 h-6" />
            <span className="text-lg font-bold">Microfrontend Demo</span>
          </div>
        </div>
        <div className="navbar-end">
          <button
            type="button"
            onClick={cycleTheme}
            className="btn btn-ghost gap-2"
            aria-label="Toggle theme"
          >
            {currentTheme === "light" && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Light mode</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>Light</span>
              </>
            )}
            {currentTheme === "dark" && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Dark mode</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                <span>Dark</span>
              </>
            )}
            {currentTheme === "system" && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>System theme</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>System</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
