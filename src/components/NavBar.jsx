import { useState } from 'react';
import { Moon, SunMedium, Menu } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function NavBar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors duration-500 dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <a href="#home" className="text-lg font-semibold tracking-tight text-slate-950 transition hover:text-brand-600 dark:text-white">
          Shagufta Saba
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white shadow-sm transition hover:bg-slate-100 dark:border-slate-700/70 dark:bg-slate-900 dark:hover:bg-slate-800"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <SunMedium className="h-5 w-5 text-slate-100" /> : <Moon className="h-5 w-5 text-slate-900" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white shadow-sm transition hover:bg-slate-100 dark:border-slate-700/70 dark:bg-slate-900 dark:hover:bg-slate-800 md:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5 text-slate-900 dark:text-slate-100" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200/80 bg-white/95 px-6 py-5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-slate-700 transition hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
