import { motion } from 'framer-motion';

const timeline = [
  { year: '2024', label: 'Started exploring AI' },
  { year: '', label: 'Learned Prompt Engineering' },
  { year: '', label: 'Built AI Projects' },
  { year: '', label: 'Learning Automation' },
  { year: '', label: 'Future AI Business Consultant' },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-14">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-card p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-600">About Me</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Who I am and why AI inspires my future.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              I’m Shagufta Saba, a B.Com student and aspiring AI business consultant. I believe AI can transform business by automating repetitive tasks, improving decision-making, and unlocking smarter growth for organizations.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Career Vision</p>
                <p className="mt-3 font-semibold text-slate-950">Bridge business and AI in real-world solutions.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Why AI?</p>
                <p className="mt-3 font-semibold text-slate-950">Because smart automation should solve business problems, not just code exercises.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/90 p-8 shadow-soft backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Career Timeline</p>
            <div className="mt-10 space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-5">
                  <div className="mt-1 h-4 w-4 rounded-full bg-brand-500" />
                  <div>
                    {item.year && <p className="text-sm font-semibold text-slate-950">{item.year}</p>}
                    <p className="mt-2 text-base leading-7 text-slate-700">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
