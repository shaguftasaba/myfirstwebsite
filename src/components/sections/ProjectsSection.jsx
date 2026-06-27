import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'AI Portfolio Website',
    description: 'A responsive portfolio showcasing projects, skills, and AI capabilities with premium glass and motion design.',
    tech: ['React', 'JavaScript', 'CSS'],
  },
  {
    title: 'Sales Dashboard',
    description: 'Interactive Power BI dashboard with KPIs, charts, and business insights for smarter decision-making.',
    tech: ['Power BI', 'Business Intelligence', 'Data Visualization'],
  },
  {
    title: 'Expense Tracker',
    description: 'Personal finance tracker built with Python and SQL to analyze spending and automate budgeting.',
    tech: ['Python', 'SQL', 'Automation'],
  },
  {
    title: 'AI Chatbot',
    description: 'AI-powered chatbot developed with ChatGPT API foundations and prompt engineering best practices.',
    tech: ['ChatGPT', 'Prompt Engineering', 'AI'],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Featured Projects</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Premium work that blends business impact with AI design.</h2>
        </div>
        <div className="grid gap-8 xl:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white/90 shadow-soft transition hover:-translate-y-1 hover:border-brand-200">
              <div className="relative aspect-[3/2] overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 opacity-90" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 to-transparent" />
                <div className="relative flex h-full items-end justify-between p-6 text-white">
                  <span className="rounded-full bg-brand-500/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white">Project</span>
                  <div className="space-x-3 text-slate-100/80">
                    <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-white/20">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                    <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-white/20">
                      <Github className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-6 p-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{project.title}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950">{project.title}</h3>
                </div>
                <p className="text-slate-600">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full border border-slate-200/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
