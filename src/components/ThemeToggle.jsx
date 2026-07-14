import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Aplica la clase 'dark' al elemento html al cargar
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg transition-colors"
    >
      {isDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  );
}