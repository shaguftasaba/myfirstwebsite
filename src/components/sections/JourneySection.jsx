import { motion } from 'framer-motion';

const journeyItems = [
  'Started with ChatGPT',
  'Explored Claude',
  'Learned Gemini',
  'Automation using n8n',
  'Python Programming',
  'AI Business Solutions',
  'Future AI Consultant',
];

export function JourneySection() {
  return (
    <section id="journey" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">AI Learning Journey</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">A progressive path from discovery to AI business solutions.</h2>
        </div>
        <div className="overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-slate-950/95 p-8 shadow-soft">
          <div className="relative h-28 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent" />
            <div className="flex h-full animate-marquee items-center gap-8 whitespace-nowrap text-xl font-semibold text-white">
              {journeyItems.concat(journeyItems).map((item, idx) => (
                <span key={`${item}-${idx}`} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
