import { motion } from 'framer-motion';

const certificates = [
  { title: 'Prompt Engineering for ChatGPT', provider: 'Coursera', date: '2025' },
  { title: 'Google AI Essentials', provider: 'Coursera', date: '2025' },
];

export function CertificationSection() {
  return (
    <section id="certifications" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Certifications</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Premium credentials for an AI-driven business career.</h2>
        </div>
        <div className="grid gap-8 xl:grid-cols-2">
          {certificates.map((cert, index) => (
            <motion.article key={cert.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.12 }} className="glass-card p-8">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 pb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{cert.provider}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950">{cert.title}</h3>
                </div>
                <div className="rounded-3xl bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-700">{cert.date}</div>
              </div>
              <p className="mt-6 text-slate-600">A premium certificate designed to showcase expertise in AI tools, prompt engineering, and business-ready innovation.</p>
              <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-100">Logo</span>
                <span>Placeholder logo for {cert.provider}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
