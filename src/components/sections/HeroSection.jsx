import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const marqueeItems = ['ChatGPT', 'Claude', 'Gemini', 'Cursor', 'GitHub Copilot', 'Midjourney', 'Leonardo AI', 'n8n', 'Make.com', 'Prompt Engineering', 'Python'];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute right-16 top-36 h-72 w-72 rounded-full bg-violet-200/25 blur-3xl" />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-24 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.9 }}>
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-sky-600">AI Business consultant in training</p>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Building the Future with Artificial Intelligence
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            B.Com Student passionate about AI, business automation and digital innovation.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-brand-500 px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-600">
              Explore Projects
              <ArrowRight className="ml-3 h-4 w-4" />
            </a>
            <button type="button" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 px-7 py-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100">
              Contact Me
            </button>
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 1.2, delay: 0.15 }} className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl sm:p-8">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between rounded-3xl bg-slate-950/95 p-5 text-white shadow-lg shadow-slate-950/10">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI tools showcase</p>
                <p className="mt-3 text-xl font-semibold">The AI ecosystem I learn and use</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-50 text-brand-700">
                <ChevronDown className="h-6 w-6" />
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-950/95 p-4">
              <div className="flex animate-marquee gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">
                {marqueeItems.concat(marqueeItems).map((item, index) => (
                  <span key={`${item}-${index}`} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100/90 shadow-[0_0_30px_rgba(255,255,255,0.04)]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
