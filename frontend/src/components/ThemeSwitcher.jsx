import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const themes = ["emerald","retro", "wireframe", "forest", "coffee"];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "cupcake");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline btn-primary flex items-center gap-1">
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">Theme</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 max-h-60 overflow-y-auto z-50">
        {themes.map((t) => (
          <li key={t}>
            <button
              className={`capitalize ${theme === t ? "font-bold" : ""}`}
              onClick={() => setTheme(t)}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
